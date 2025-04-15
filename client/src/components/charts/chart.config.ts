// d:\WEB DEVELOPMENT PROJECTS\refine_dashboard\client\src\components\charts\chart.config.ts
import type { ApexOptions } from "apexcharts";

export const TotalRevenueSeries = [
    {
        name: "Last Month",
        data: [183, 124, 115, 85, 143, 143, 96],
    },
    {
        name: "Running Month",
        data: [95, 84, 72, 44, 108, 108, 47],
    },
];

export const TotalRevenueOptions: ApexOptions = {
    chart: {
        type: "bar",
        toolbar: {
            show: false,
        },
    },
    colors: ["#475BE8", "#CFC8FF"],
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: "55%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    grid: {
        show: false, // Keep grid lines hidden
    },
    stroke: {
        colors: ["transparent"],
        width: 4,
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        labels: {
            style: {
                // Corrected invalid color #0000
                colors: "#11142d", // Use your theme's dark color
                fontSize: '12px',
            },
        },
    },
    yaxis: {
        title: {
            text: "$ (thousands)",
            style: {
                // Corrected invalid color #00000
                color: "#808191", // Use a secondary color like grey
                fontSize: '12px',
            },
        },
        labels: {
            style: {
                colors: "#11142d", // This one was already correct
                fontSize: '12px',
            },
            // Optional: Formatter if needed
            // formatter: function (val) {
            //     return val.toFixed(0);
            // }
        },
    },
    fill: {
        opacity: 1,
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
        labels: {
            colors: "#11142d", // This one was already correct
        },
    },
    tooltip: {
        theme: 'light', // Keep light theme for dark text
        y: {
            formatter(val: number) {
                return `$ ${val} thousands`;
            },
        },
    },
};
