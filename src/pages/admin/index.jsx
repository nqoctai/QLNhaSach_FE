import { Card, Col, Row, Select, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { callFetchAllCategoryAndQuantityBookAreSold, callFetchDashboard, callFetchGenderRatio, callFetchRevenue, callFetchTop5BookAreSold, callFetchView6 } from "../../services/api";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
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

    const [barCategoryData, setBarCategoryData] = useState({
        labels: [],
        datasets: []
    });

    const [pieCategoryData, setPieCategoryData] = useState({
        labels: [],
        datasets: []
    });

    const [pieGenderData, setPieGenderData] = useState({
        labels: [],
        datasets: []
    });

    const [topBooksBarData, setTopBooksBarData] = useState({
        labels: [],
        datasets: []
    });

    const [selectedYear, setSelectedYear] = useState("2024");

    const fetchRevenueData = async (year) => {

        const res = await callFetchRevenue(year); // API trả về dữ liệu doanh thu
        if (res && res.data) {
            const labels = res.data.map(item => item.thang);
            const revenue = res.data.map(item => item.doanhThu);
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

    const fetchCategoryData = async () => {

        const res = await callFetchAllCategoryAndQuantityBookAreSold();
        if (res && res.data) {
            const totalQuantity = res.data.reduce((total, item) => total + item.soLuongBan, 0);
            setBarCategoryData({
                labels: res.data.map(item => item.theLoai),
                datasets: [
                    {
                        label: "Số lượng bán",
                        data: res.data.map(item => item.soLuongBan),
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1
                    }
                ]
            });


            setPieCategoryData({
                labels: res.data.map(item => item.theLoai),
                datasets: [
                    {
                        label: "Tỷ lệ bán",
                        data: res.data.map(item => (item.soLuongBan / totalQuantity) * 100),
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)"
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                        ],
                        borderWidth: 1
                    }
                ]
            });
        }

    }

    const fetchGenderRatio = async () => {

        const res = await callFetchGenderRatio();
        if (res && res.data) {

            setPieGenderData({
                labels: res.data.map(item => item.gender),
                datasets: [
                    {
                        label: "Tỷ lệ giới tính",
                        data: res.data.map(item => item.percentage),
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)",
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)"
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)",
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                        ],
                        borderWidth: 1
                    }
                ]
            });
        }

    }

    const fetchTop5BookSold = async () => {

        const topBooksData = await callFetchTop5BookAreSold();
        if (topBooksData && topBooksData.data) {
            const res = {
                labels: topBooksData.data.map(item => item.bookTitle),
                datasets: [
                    {
                        label: "Số lượng bán",
                        data: topBooksData.data.map(item => item.totalQuantitySold),
                        backgroundColor: "orange",
                        borderColor: "orange",
                        borderWidth: 1
                    }
                ]
            };

            setTopBooksBarData(res);
        }

    }
    useEffect(() => {
        fetchRevenueData(selectedYear);
    }, [selectedYear]);


    useEffect(() => {
        const initDashboard = async () => {
            const res = await callFetchView6();
            if (res && res.data) setDataDashboard(res.data)
        }
        initDashboard();
        fetchRevenueData(selectedYear);
        fetchCategoryData();
        fetchTop5BookSold();
        fetchGenderRatio();
    }, []);

    const handleYearChange = (value) => {
        setSelectedYear(value); // Cập nhật năm khi người dùng chọn
    };

    const formatter = (value) => <CountUp end={value} separator="," />;
    return (
        <>
            <div style={{ height: "100vh", overflowY: "auto", padding: "20px" }}>
                <Row gutter={[40, 40]}>
                    <Col span={6}>
                        <Card title="" bordered={false} >
                            <Statistic
                                title="Số lượng khách hàng"
                                value={dataDashboard.tongSoLuongKhachHang}
                                formatter={formatter}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="" bordered={false} >
                            <Statistic title="Số lượng đơn hàng thành công" value={dataDashboard.tongSoLuongDatHangThanhCong} precision={2} formatter={formatter} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="" bordered={false} >
                            <Statistic
                                title="Số lượng sách"
                                value={dataDashboard.tongSoLuongSach}
                                formatter={formatter}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="" bordered={false} >
                            <Statistic title="Số lượng nhân viên" value={dataDashboard.tongSoLuongNhanVien} precision={2} formatter={formatter} />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[40, 40]} style={{ marginTop: "20px" }}>
                    <Col span={24}>
                        <Card style={{ height: "400px", overflowY: "scroll" }} title="Biểu đồ doanh thu theo tháng" bordered={false}>
                            <Select
                                defaultValue={selectedYear}
                                style={{ width: 200, marginBottom: "20px" }}
                                onChange={handleYearChange}
                            >
                                <Option value="2021">2021</Option>
                                <Option value="2022">2022</Option>
                                <Option value="2023">2023</Option>
                                <Option value="2024">2024</Option>
                            </Select>
                            {/* Container để điều chỉnh kích thước biểu đồ */}
                            <div style={{ width: "80%", height: "200px", margin: "0 auto" }}>
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
                                            }, datalabels: {
                                                color: '#001632',
                                                font: {
                                                    weight: 'bold'
                                                },
                                                anchor: 'start',
                                                align: 'end',
                                                offset: 10 // Điều chỉnh khoảng cách hiển thị
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </Card>

                    </Col>
                </Row>
                <Row gutter={[40, 40]} style={{ marginTop: "20px" }}>
                    <Col span={12}>
                        <Card style={{ height: "500px", overflowY: "scroll" }} title="Biểu đồ số lượng bán theo thể loại" bordered={false}>
                            <div style={{ width: "80%", height: "300px", margin: "0 auto" }}>
                                <Bar
                                    data={barCategoryData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: "top"
                                            },
                                            title: {
                                                display: true,
                                                text: "Biểu đồ số lượng bán theo thể loại"
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card title="Tỷ lệ bán theo thể loại" bordered={false}>
                            <div style={{ width: "100%", height: "400px" }}>
                                <Pie
                                    data={pieCategoryData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: "top"
                                            },
                                            title: {
                                                display: true,
                                                text: "Tỷ lệ bán theo thể loại"
                                            },
                                            datalabels: {
                                                formatter: (value, context) => {
                                                    return value.toFixed(2) + '%';
                                                },
                                                color: '#001632',
                                                font: {
                                                    weight: 'bold'
                                                },
                                                anchor: 'end',
                                                align: 'start',
                                                offset: 10 // Điều chỉnh khoảng cách hiển thị
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </Card>
                    </Col>

                </Row >
                <Row gutter={[40, 40]} style={{ marginTop: "20px" }}>
                    <Col span={12}>
                        <Card style={{ height: "500px", overflowY: "scroll" }} title="Tỷ lệ giới tính khách hàng" bordered={false}>
                            <div style={{ width: "100%", height: "300px" }}>
                                <Pie
                                    data={pieGenderData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: "top"
                                            },
                                            title: {
                                                display: true,
                                                text: "Tỷ lệ giới tính khách hàng"
                                            },
                                            datalabels: {
                                                formatter: (value, context) => {
                                                    return value.toFixed(2) + '%';
                                                },
                                                color: '#001632',
                                                font: {
                                                    weight: 'bold'
                                                },
                                                anchor: 'end',
                                                align: 'start',
                                                offset: 10 // Điều chỉnh khoảng cách hiển thị
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card style={{ height: "500px", overflowY: "scroll" }} title="Top 5 sách bán chạy nhất" bordered={false}>
                            <div style={{ width: "100%", height: "300px", margin: "0 auto" }}>
                                <Bar
                                    data={topBooksBarData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: "top"
                                            },
                                            title: {
                                                display: true,
                                                text: "Top 5 sách bán chạy nhất"
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </Card>
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default AdminPage;
