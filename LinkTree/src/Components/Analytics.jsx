import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid ,BarChart ,Bar,Cell ,PieChart, Pie,  Legend,  } from "recharts";
import "./Analytics.css";
import { FaCalendarAlt } from "react-icons/fa";

const Analytics = () => {
  const [clicksData, setClicksData] = useState({
    totallinkclicks: 0,
    totalshopclicks: 0,
    cta: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [siteTraffic, setSiteTraffic] = useState([]);
  const [linksTrafficData, setLinksTrafficData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  

  useEffect(() => {
    const fetchLinksTraffic = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        const response = await fetch(`https://linktree-backend-0abv.onrender.com/api/user-links-traffic?date=${selectedDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.success) {
          const formattedLinks = data.links.map((link, index) => ({
            name: link.title || `Link ${index + 1}`,
            clicks: link.clicks || 0,
            color: ["#98F5C1", "#A5EEC7", "#0D3B26", "#3FE08C", "#A0C8B0", "#1AA566"][index % 6],
          }));

          setLinksTrafficData(formattedLinks);
        } else {
          console.error("Failed to fetch links traffic:", data.message);
        }
      } catch (error) {
        console.error("Error fetching links traffic:", error);
      }
    };

    fetchLinksTraffic();
  }, [selectedDate]); // ✅ Re-fetch data when date changes

  // ✅ Handle Date Change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        const response = await fetch("https://linktree-backend-0abv.onrender.com/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.success) {
          setClicksData({
            totallinkclicks: data.totallinkclicks,
            totalshopclicks: data.totalshopclicks,
            cta: data.cta,
          });

          // Process the data to ensure 6 months are always shown
          setMonthlyData(formatMonthlyData(data.monthlyClicks));
        } else {
          console.error("Failed to fetch analytics:", data.message);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        const response = await fetch("https://linktree-backend-0abv.onrender.com/traffic", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.success) {
            setDeviceData([
              { name: "Linux", traffic: data.traffic.Linux || 0, color: "#98F5C1" },
              { name: "Mac", traffic: data.traffic.Mac || 0, color: "#A5EEC7" },
              { name: "iOS", traffic: data.traffic.iOS || 0, color: "#0D3B26" },
              { name: "Windows", traffic: data.traffic.Windows || 0, color: "#3FE08C" },
              { name: "Android", traffic: data.traffic.Android || 0, color: "#A0C8B0" },
              { name: "Other", traffic: data.traffic.Others || 0, color: "#1AA566" },
            ]);
        } else {
          console.error("Failed to fetch traffic data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      }
    };

    fetchTrafficData();
  }, []);


  useEffect(() => {
    const fetchSiteTraffic = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found.");
          return;
        }
  
        const response = await fetch("https://linktree-backend-0abv.onrender.com/site-traffic", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const data = await response.json();
        if (data.success) {
          const formattedTraffic = [
            { name: "Youtube", value: data.traffic.Youtube || 0, color: "#0D3B26" },
            { name: "Facebook", value: data.traffic.Facebook || 0, color: "#3FE08C" },
            { name: "Instagram", value: data.traffic.Instagram || 0, color: "#A0C8B0" },
            { name: "Other", value: data.traffic.Other || 0, color: "#98F5C1" },
          ];
  
          // ✅ Log clicks in frontend for debugging
          formattedTraffic.forEach((item) => {
            console.log(`Category: ${item.name}, Clicks: ${item.value}`);
          });
  
          setSiteTraffic(formattedTraffic);
        } else {
          console.error("Failed to fetch site traffic data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching site traffic data:", error);
      }
    };
  
    fetchSiteTraffic();
  }, []);
  
  
  // Function to format data and ensure 6 months
  const formatMonthlyData = (apiData) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-based (0 = Jan, 1 = Feb, ...)
    const currentYear = currentDate.getFullYear();

    // Create last 6 months dynamically
    const lastSixMonths = [];
    for (let i = 5; i >= 0; i--) {
      let monthIndex = (currentMonth - i + 12) % 12;
      let yearOffset = currentYear - (currentMonth - i < 0 ? 1 : 0);
      lastSixMonths.push({
        month: monthNames[monthIndex], // "Jan", "Feb", etc.
        year: yearOffset,
        totalClicks: 0, // Default value, will be replaced if data exists
      });
    }

    // Convert API data into a Map for easy lookup
    const apiDataMap = new Map(apiData.map((item) => {
      const [year, month] = item.month.split("-"); // "2025-03" → year: "2025", month: "03"
      return [`${parseInt(year)}-${parseInt(month)}`, item.totalClicks]; // Store clicks using `YYYY-M`
    }));

    // Populate lastSixMonths with actual data if available
    const finalData = lastSixMonths.map((monthData) => {
      const key = `${monthData.year}-${monthNames.indexOf(monthData.month) + 1}`;
      return {
        month: monthData.month, // Keep month name
        totalClicks: apiDataMap.get(key) || 0, // Replace 0 if data exists
      };
    });

    return finalData;
  };

  // Get maximum value for Y-axis scaling
  const maxClicks = Math.max(...monthlyData.map((item) => item.totalClicks), 10);

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Overview</h2>
        <button className="date-picker">
          <FaCalendarAlt /> <input 
            type="date" 
            value={selectedDate} 
            onChange={handleDateChange}
            className="date-picker"
          />
        </button>
      </div>

      <div className="analytics-summary">
        <div className="summary-card green">
          <p>Clicks on Links</p>
          <h3>{clicksData.totallinkclicks}</h3>
        </div>
        <div className="summary-card light-green">
          <p>Click on Shop</p>
          <h3>{clicksData.totalshopclicks}</h3>
        </div>
        <div className="summary-card light-green">
          <p>CTA</p>
          <h3>{clicksData.cta}</h3>
        </div>
      </div>

      {/* Line Graph Section */}
      <div className="analytics-chart">
        <h3>Monthly Clicks Overview</h3>
        <ResponsiveContainer width="100%" height={300} className={"analytics-chart"}>
          <LineChart data={monthlyData} margin={{  right: 30  }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, maxClicks + 10]} />
            <Tooltip />
            <Line type="monotone" dataKey="totalClicks" stroke="#4CAF50" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>


      <div className="midx">
        <div className="device">
          <h3>Traffic by Device</h3>
          <ResponsiveContainer width="100%" height={300} className={"analytics-chart2"}>
<BarChart data={deviceData} margin={{ right: 30}}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="traffic">
    {deviceData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color} />
    ))}
  </Bar>
</BarChart>
</ResponsiveContainer>
        </div>




<div className="pie">

<div className="pp">
<h3>Sites</h3>
<ResponsiveContainer width={300} height={250} className={"analytics-chart3"}>
<PieChart>
  <Pie
    data={siteTraffic}
    cx="50%"
    cy="50%"
    innerRadius={50}
    outerRadius={80}
    fill="#8884d8"
    paddingAngle={5}
    dataKey="value"
  >
    {siteTraffic.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color} />
    ))}
  </Pie>
  <Legend />
</PieChart>
</ResponsiveContainer>
</div>
</div>
      </div>


<div className="bottom">
  <h3>Traffic by links</h3>
<ResponsiveContainer width="100%" height={300} className={"analytics-chart4"}>
<BarChart data={linksTrafficData} margin={{  }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="clicks">
    {linksTrafficData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color} />
    ))}
  </Bar>
</BarChart>
</ResponsiveContainer>
</div>



    </div>
  );
};

export default Analytics;



























