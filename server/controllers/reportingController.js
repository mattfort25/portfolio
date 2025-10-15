// server/controllers/reportingController.js
const SandboxAsset = require("../models/SandboxAsset");
const UserAsset = require("../models/UserAsset");
const Asset = require("../models/Asset");
const { getStockDetailsFromAPI } = require("../utils/stockApi");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

// Get reporting data from user's portfolio
exports.getReportingData = async (req, res) => {
  try {
    const userId = req.user.id;

    const portfolioAssets = await SandboxAsset.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Asset,
          attributes: ["asset_id", "name", "ticker"],
        },
      ],
    });

    if (portfolioAssets.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No assets in portfolio for reporting.",
      });
    }

    // Fetch current prices and daily changes
    const reportData = await Promise.all(
      portfolioAssets.map(async (item) => {
        try {
          const stockData = await getStockDetailsFromAPI(item.Asset.ticker);
          return {
            id: item.sandbox_asset_id,
            name: item.Asset.name,
            ticker: item.Asset.ticker,
            price: stockData.regularMarketPrice || 0,
            dailyChange: stockData.regularMarketChangePercent || 0,
            shares: item.quantity,
            totalValue: (stockData.regularMarketPrice || 0) * item.quantity,
          };
        } catch (apiError) {
          console.error(
            `Error fetching data for ${item.Asset.ticker}:`,
            apiError.message
          );
          return {
            id: item.sandbox_asset_id,
            name: item.Asset.name,
            ticker: item.Asset.ticker,
            price: 0,
            dailyChange: 0,
            shares: item.quantity,
            totalValue: 0,
          };
        }
      })
    );

    return res.status(200).json({
      success: true,
      data: reportData,
      message: "Reporting data fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching reporting data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reporting data.",
    });
  }
};

// Create CSV report
exports.generateCSVReport = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for report generation.",
      });
    }

    // Create CSV content
    const headers = [
      "Company",
      "Ticker",
      "Price",
      "Daily Change (%)",
      "Shares",
      "Total Value",
    ];
    let csvContent = headers.join(",") + "\n";

    data.forEach((item) => {
      const row = [
        `"${item.name}"`,
        item.ticker,
        item.price.toFixed(2),
        item.dailyChange.toFixed(2),
        item.shares,
        (item.price * item.shares).toFixed(2),
      ];
      csvContent += row.join(",") + "\n";
    });

    // Calculate totals
    const totalShares = data.reduce((sum, item) => sum + item.shares, 0);
    const totalValue = data.reduce(
      (sum, item) => sum + item.price * item.shares,
      0
    );
    csvContent += `\nTotals,,,,${totalShares},${totalValue.toFixed(2)}`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=portfolio_report_${
        new Date().toISOString().split("T")[0]
      }.csv`
    );
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error("Error generating CSV report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate CSV report.",
    });
  }
};

// Create Excel report
exports.generateExcelReport = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for report generation.",
      });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Portfolio Report");

    // Add title
    worksheet.mergeCells("A1:F1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "Portfolio Report";
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: "center" };

    // Add date
    worksheet.mergeCells("A2:F2");
    const dateCell = worksheet.getCell("A2");
    dateCell.value = `Generated: ${new Date().toLocaleString()}`;
    dateCell.alignment = { horizontal: "center" };

    // Add headers
    worksheet.addRow([]);
    const headerRow = worksheet.addRow([
      "Company",
      "Ticker",
      "Price",
      "Daily Change (%)",
      "Shares",
      "Total Value",
    ]);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE0E0E0" },
    };

    // Add data
    data.forEach((item) => {
      const row = worksheet.addRow([
        item.name,
        item.ticker,
        item.price,
        item.dailyChange,
        item.shares,
        item.price * item.shares,
      ]);

      row.getCell(3).numFmt = "$#,##0.00";
      row.getCell(4).numFmt = "0.00";
      row.getCell(6).numFmt = "$#,##0.00";

      if (item.dailyChange >= 0) {
        row.getCell(4).font = { color: { argb: "FF10B981" } };
      } else {
        row.getCell(4).font = { color: { argb: "FFEF4444" } };
      }
    });

    const totalShares = data.reduce((sum, item) => sum + item.shares, 0);
    const totalValue = data.reduce(
      (sum, item) => sum + item.price * item.shares,
      0
    );
    worksheet.addRow([]);
    const totalsRow = worksheet.addRow([
      "Totals",
      "",
      "",
      "",
      totalShares,
      totalValue,
    ]);
    totalsRow.font = { bold: true };
    totalsRow.getCell(6).numFmt = "$#,##0.00";

    worksheet.columns = [
      { width: 25 },
      { width: 12 },
      { width: 12 },
      { width: 18 },
      { width: 12 },
      { width: 15 },
    ];

    // create buffer
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=portfolio_report_${
        new Date().toISOString().split("T")[0]
      }.xlsx`
    );
    return res.status(200).send(buffer);
  } catch (error) {
    console.error("Error generating Excel report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate Excel report.",
    });
  }
};

// Create PDF report
exports.generatePDFReport = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for report generation.",
      });
    }

    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=portfolio_report_${
          new Date().toISOString().split("T")[0]
        }.pdf`
      );
      res.status(200).send(pdfBuffer);
    });

    // Add title
    doc.fontSize(20).font("Helvetica-Bold").text("Portfolio Report", {
      align: "center",
    });
    doc.moveDown();

    // Add date
    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Generated: ${new Date().toLocaleString()}`, {
        align: "center",
      });
    doc.moveDown(2);

    // Table headers
    const tableTop = doc.y;
    const col1 = 50;
    const col2 = 200;
    const col3 = 270;
    const col4 = 340;
    const col5 = 430;
    const col6 = 490;

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("Company", col1, tableTop)
      .text("Ticker", col2, tableTop)
      .text("Price", col3, tableTop)
      .text("Change %", col4, tableTop)
      .text("Shares", col5, tableTop)
      .text("Total", col6, tableTop);

    doc.moveDown();
    let yPosition = doc.y;

    doc
      .strokeColor("#cccccc")
      .lineWidth(1)
      .moveTo(col1, yPosition)
      .lineTo(560, yPosition)
      .stroke();

    yPosition += 10;

    doc.font("Helvetica").fontSize(9);
    let totalShares = 0;
    let totalValue = 0;

    data.forEach((item, index) => {
      if (yPosition > 700) {
        doc.addPage();
        yPosition = 50;
      }

      const companyName =
        item.name.length > 20 ? item.name.substring(0, 17) + "..." : item.name;

      doc
        .text(companyName, col1, yPosition)
        .text(item.ticker, col2, yPosition)
        .text(`${item.price.toFixed(2)}`, col3, yPosition)
        .fillColor(item.dailyChange >= 0 ? "#10B981" : "#EF4444")
        .text(`${item.dailyChange.toFixed(2)}%`, col4, yPosition)
        .fillColor("#000000")
        .text(item.shares.toString(), col5, yPosition)
        .text(`${(item.price * item.shares).toFixed(2)}`, col6, yPosition);

      yPosition += 20;
      totalShares += item.shares;
      totalValue += item.price * item.shares;
    });

    yPosition += 5;
    doc
      .strokeColor("#cccccc")
      .lineWidth(1)
      .moveTo(col1, yPosition)
      .lineTo(560, yPosition)
      .stroke();

    yPosition += 15;

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Totals", col1, yPosition)
      .text(totalShares.toString(), col5, yPosition)
      .text(`${totalValue.toFixed(2)}`, col6, yPosition);

    // Add summary section
    yPosition += 40;
    doc.fontSize(12).text("Portfolio Summary", col1, yPosition);
    yPosition += 20;
    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Total Holdings: ${data.length}`, col1, yPosition)
      .text(
        `Total Portfolio Value: ${totalValue.toFixed(2)}`,
        col1,
        yPosition + 15
      );

    doc.end();
  } catch (error) {
    console.error("Error generating PDF report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate PDF report.",
    });
  }
};
