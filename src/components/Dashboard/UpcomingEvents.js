import React from "react";

const mockEvents = [
  {
    date: "Oct 1",
    title: "GOOGL Earnings Call",
    detail: "Review Q3 financial results and outlook.",
  },
  {
    date: "Oct 15",
    title: "MSFT Dividend Payout",
    detail: "Quarterly dividend payment to shareholders.",
  },
  {
    date: "Oct 25",
    title: "NVDA Product Launch",
    detail: "Announcement of new AI processing unit.",
  },
];

const UpcomingEvents = () => {
  const styles = {
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(15, 23, 32, 0.06)",
      padding: "20px",
      marginBottom: "20px",
    },
    navHeader: {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "12px",
      color: "#0f1720",
    },
    eventsList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
    },
    eventItem: {
      padding: "10px",
      borderBottom: "1px solid #f1f3f5",
    },
    eventItemLast: {
      borderBottom: "none",
    },
    eventTitle: {
      fontWeight: "600",
    },
    mutedSmall: {
      fontSize: "12px",
      color: "#9aa5b1",
    },
  };

  return (
    <div style={styles.card}>
      <h6 style={styles.navHeader}>Upcoming Events</h6>
      <ul style={styles.eventsList}>
        {mockEvents.map((event, index) => (
          <li
            key={index}
            style={{
              ...styles.eventItem,
              ...(index === mockEvents.length - 1 ? styles.eventItemLast : {}),
            }}
          >
            <div>
              <div style={styles.eventTitle}>{event.title}</div>
              <div style={styles.mutedSmall}>
                {event.date} • {event.detail}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
