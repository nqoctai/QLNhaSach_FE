import { Card, Col, Row, Select, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';
import { callFetchDashboard } from "../../services/api";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const AdminPage = () => {
    const [dataDashboard, setDataDashboard] = useState({
        countOrder: 0,
        countUser: 0
    })

    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: []
    });

    const [selectedYear, setSelectedYear] = useState("2023");

    const fetchRevenueData = (year) => {
        const res = {
            "2023": [
                { month: "Jan", revenue: 5000 },
                { month: "Feb", revenue: 10000 },
                { month: "Mar", revenue: 7500 },
                { month: "Apr", revenue: 12000 },
                { month: "May", revenue: 15000 },
                { month: "Jun", revenue: 11000 }
            ],
            "2024": [
                { month: "Jan", revenue: 7000 },
                { month: "Feb", revenue: 9000 },
                { month: "Mar", revenue: 8500 },
                { month: "Apr", revenue: 13000 },
                { month: "May", revenue: 14000 },
                { month: "Jun", revenue: 12500 }
            ]
        };
        // API trả về dữ liệu doanh thu
        if (res[year]) {
            const labels = res[year].map(item => item.month);
            const revenue = res[year].map(item => item.revenue);

            setRevenueData({
                labels,
                datasets: [
                    {
                        label: `Doanh thu năm ${year}`,
                        data: revenue,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        tension: 0.4
                    }
                ]
            });
        }
    }
    useEffect(() => {
        fetchRevenueData(selectedYear);
    }, [selectedYear]);
    useEffect(() => {
        const initDashboard = async () => {
            const res = await callFetchDashboard();
            if (res && res.data) setDataDashboard(res.data)
        }
        initDashboard();
    }, []);

    const handleYearChange = (value) => {
        setSelectedYear(value); // Cập nhật năm khi người dùng chọn
    };

    const formatter = (value) => <CountUp end={value} separator="," />;
    return (
        <Row gutter={[40, 40]} style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <Col span={10}>
                <Card title="" bordered={false} >
                    <Statistic
                        title="Tổng Users"
                        value={dataDashboard.totalAccount}
                        formatter={formatter}
                    />
                </Card>
            </Col>
            <Col span={10}>
                <Card title="" bordered={false} >
                    <Statistic title="Tổng Đơn hàng" value={dataDashboard.totalOrder} precision={2} formatter={formatter} />
                </Card>
            </Col>
            <Col span={24}>
                <Card title="Biểu đồ doanh thu theo tháng" bordered={false}>
                    <Select
                        defaultValue={selectedYear}
                        style={{ width: 200, marginBottom: "20px" }}
                        onChange={handleYearChange}
                    >
                        <Option value="2023">2023</Option>
                        <Option value="2024">2024</Option>
                    </Select>
                    {/* Container để điều chỉnh kích thước biểu đồ */}
                    <div style={{ width: "80%", height: "300px", margin: "0 auto" }}>
                        <Line
                            data={revenueData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false, // Đảm bảo biểu đồ có thể co giãn theo kích thước container
                                plugins: {
                                    legend: {
                                        position: "top"
                                    },
                                    title: {
                                        display: true,
                                        text: "Biểu đồ doanh thu theo tháng"
                                    }
                                }
                            }}
                        />
                    </div>
                </Card>
            </Col>
        </Row>
    )
}

export default AdminPage;
