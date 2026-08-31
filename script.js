
const ageData = [

    {
        age_group: "18-25",
        count: 200
    },

    {
        age_group: "26-35",
        count: 300
    },

    {
        age_group: "36-45",
        count: 250
    },

    {
        age_group: "46-60",
        count: 150
    },

    {
        age_group: "60+",
        count: 100
    }

];

const studentData = [

    {
        student: "A",
        study_hours: 5,
        score: 70
    },

    {
        student: "B",
        study_hours: 10,
        score: 85
    },

    {
        student: "C",
        study_hours: 3,
        score: 60
    },

    {
        student: "D",
        study_hours: 8,
        score: 80
    },

    {
        student: "E",
        study_hours: 6,
        score: 75
    }

];

const hospitalData = [

    {
        year: 2018,
        Emergency: 1200,
        Surgery: 800,
        Pediatrics: 500,
        General: 1500
    },

    {
        year: 2019,
        Emergency: 1300,
        Surgery: 850,
        Pediatrics: 550,
        General: 1600
    },

    {
        year: 2020,
        Emergency: 1400,
        Surgery: 900,
        Pediatrics: 600,
        General: 1700
    },

    {
        year: 2021,
        Emergency: 1600,
        Surgery: 950,
        Pediatrics: 650,
        General: 1800
    },

    {
        year: 2022,
        Emergency: 1800,
        Surgery: 1000,
        Pediatrics: 700,
        General: 1900
    }

];



const tooltip =
    d3.select("#tooltip");

const totalCustomers =
    d3.sum(
        ageData,
        d => d.count
    );


document.getElementById(
    "totalCustomers"
).textContent =
    totalCustomers.toLocaleString();



const largestAge =
    ageData.reduce(
        (a, b) =>
            a.count > b.count
                ? a
                : b
    );


document.getElementById(
    "largestAge"
).textContent =
    largestAge.age_group;


document.getElementById(
    "largestAgeCount"
).textContent =
    `${largestAge.count.toLocaleString()} customers`;


const averageScore =
    d3.mean(
        studentData,
        d => d.score
    );


document.getElementById(
    "averageScore"
).textContent =
    averageScore.toFixed(1);


const totalAdmissions =
    d3.sum(
        hospitalData,
        d =>
            d.Emergency +
            d.Surgery +
            d.Pediatrics +
            d.General
    );


document.getElementById(
    "totalAdmissions"
).textContent =
    totalAdmissions.toLocaleString();


function createAgeChart() {

    const width = 1050;

    const height = 430;

    const margin = {

        top: 30,

        right: 40,

        bottom: 65,

        left: 70

    };


    const chartWidth =
        width -
        margin.left -
        margin.right;


    const chartHeight =
        height -
        margin.top -
        margin.bottom;


    const svg =
        d3.select("#ageChart")

        .append("svg")

        .attr(
            "viewBox",
            `0 0 ${width} ${height}`
        )

        .attr(
            "width",
            "100%"
        )

        .attr(
            "height",
            height
        );


    const chart =
        svg.append("g")

        .attr(
            "transform",
            `translate(
                ${margin.left},
                ${margin.top}
            )`
        );


    // X scale

    const x =
        d3.scaleBand()

        .domain(
            ageData.map(
                d => d.age_group
            )
        )

        .range(
            [0, chartWidth]
        )

        .padding(0.3);


    // Y scale

    const y =
        d3.scaleLinear()

        .domain(
            [
                0,
                d3.max(
                    ageData,
                    d => d.count
                )
            ]
        )

        .nice()

        .range(
            [chartHeight, 0]
        );


    // Grid

    chart.append("g")

        .attr(
            "class",
            "grid"
        )

        .call(

            d3.axisLeft(y)

                .ticks(6)

                .tickSize(
                    -chartWidth
                )

                .tickFormat("")
        );


    // Bars

    chart.selectAll("rect")

        .data(ageData)

        .enter()

        .append("rect")

        .attr(
            "x",
            d => x(d.age_group)
        )

        .attr(
            "y",
            d => y(d.count)
        )

        .attr(
            "width",
            x.bandwidth()
        )

        .attr(
            "height",
            d =>
                chartHeight -
                y(d.count)
        )

        .attr(
            "fill",
            "#6366f1"
        )

        .attr(
            "rx",
            7
        )

        .on(
            "mousemove",
            function(event, d) {

                tooltip

                    .style(
                        "opacity",
                        1
                    )

                    .html(`
                        <strong>
                            Age ${d.age_group}
                        </strong>
                        <br>
                        Customers:
                        ${d.count.toLocaleString()}
                    `)

                    .style(
                        "left",
                        `${event.pageX + 15}px`
                    )

                    .style(
                        "top",
                        `${event.pageY - 40}px`
                    );
            }
        )

        .on(
            "mouseout",
            function() {

                tooltip.style(
                    "opacity",
                    0
                );

            }
        );


    // Values on top of bars

    chart.selectAll(".value")

        .data(ageData)

        .enter()

        .append("text")

        .attr(
            "x",
            d =>
                x(d.age_group) +
                x.bandwidth() / 2
        )

        .attr(
            "y",
            d =>
                y(d.count) - 8
        )

        .attr(
            "text-anchor",
            "middle"
        )

        .attr(
            "fill",
            "#374151"
        )

        .attr(
            "font-size",
            "13px"
        )

        .attr(
            "font-weight",
            "bold"
        )

        .text(
            d =>
                d.count.toLocaleString()
        );


    // X Axis

    chart.append("g")

        .attr(
            "class",
            "axis"
        )

        .attr(
            "transform",
            `translate(
                0,
                ${chartHeight}
            )`
        )

        .call(
            d3.axisBottom(x)
        );


    // Y Axis

    chart.append("g")

        .attr(
            "class",
            "axis"
        )

        .call(
            d3.axisLeft(y)
        );


    // X Label

    chart.append("text")

        .attr(
            "class",
            "axis-label"
        )

        .attr(
            "x",
            chartWidth / 2
        )

        .attr(
            "y",
            chartHeight + 50
        )

        .attr(
            "text-anchor",
            "middle"
        )

        .text(
            "Age Group"
        );


    // Y Label

    chart.append("text")

        .attr(
            "class",
            "axis-label"
        )

        .attr(
            "transform",
            "rotate(-90)"
        )

        .attr(
            "x",
            -chartHeight / 2
        )

        .attr(
            "y",
            -50
        )

        .attr(
            "text-anchor",
            "middle"
        )

        .text(
            "Number of Customers"
        );

}


function createStudentChart() {

    const width = 1050;

    const height = 430;

    const margin = {

        top: 30,

        right: 40,

        bottom: 65,

        left: 70

    };


    const chartWidth =
        width -
        margin.left -
        margin.right;


    const chartHeight =
        height -
        margin.top -
        margin.bottom;


    const svg =
        d3.select("#studentChart")

        .append("svg")

        .attr(
            "viewBox",
            `0 0 ${width} ${height}`
        )

        .attr(
            "width",
            "100%"
        )

        .attr(
            "height",
            height
        );


    const chart =
        svg.append("g")

        .attr(
            "transform",
            `translate(
                ${margin.left},
                ${margin.top}
            )`
        );


    // X

    const x =
        d3.scaleLinear()

        .domain(
            [
                0,
                d3.max(
                    studentData,
                    d =>
                        d.study_hours
                ) + 1
            ]
        )

        .range(
            [0, chartWidth]
        );


    // Y

    const y =
        d3.scaleLinear()

        .domain(
            [50, 100]
        )

        .range(
            [chartHeight, 0]
        );


    // Grid

    chart.append("g")

        .attr(
            "class",
            "grid"
        )

        .call(

            d3.axisLeft(y)

                .ticks(6)

                .tickSize(
                    -chartWidth
                )

                .tickFormat("")
        );


    // Dots

    chart.selectAll(".student-dot")

        .data(studentData)

        .enter()

        .append("circle")

        .attr(
            "class",
            "student-dot"
        )

        .attr(
            "cx",
            d =>
                x(d.study_hours)
        )

        .attr(
            "cy",
            d =>
                y(d.score)
        )

        .attr(
            "r",
            10
        )

        .attr(
            "fill",
            "#8b5cf6"
        )

        .on(
            "mousemove",
            function(event, d) {

                d3.select(this)
                    .attr("r", 13);


                tooltip

                    .style(
                        "opacity",
                        1
                    )

                    .html(`
                        <strong>
                            Student ${d.student}
                        </strong>
                        <br>
                        Study Hours:
                        ${d.study_hours} hours
                        <br>
                        Score:
                        ${d.score}
                    `)

                    .style(
                        "left",
                        `${event.pageX + 15}px`
                    )

                    .style(
                        "top",
                        `${event.pageY - 40}px`
                    );

            }
        )

        .on(
            "mouseout",
            function() {

                d3.select(this)
                    .attr("r", 10);

                tooltip.style(
                    "opacity",
                    0
                );

            }
        );


    // Student labels

    chart.selectAll(".student-label")

        .data(studentData)

        .enter()

        .append("text")

        .attr(
            "x",
            d =>
                x(d.study_hours) + 14
        )

        .attr(
            "y",
            d =>
                y(d.score) + 5
        )

        .attr(
            "fill",
            "#374151"
        )

        .attr(
            "font-size",
            "13px"
        )

        .attr(
            "font-weight",
            "bold"
        )

        .text(
            d =>
                d.student
        );


    // X Axis

    chart.append("g")

        .attr(
            "class",
            "axis"
        )

        .attr(
            "transform",
            `translate(
                0,
                ${chartHeight}
            )`
        )

        .call(
            d3.axisBottom(x)
        );


    // Y Axis

    chart.append("g")

        .attr(
            "class",
            "axis"
        )

        .call(
            d3.axisLeft(y)
        );


    // X Label

    chart.append("text")

        .attr(
            "class",
            "axis-label"
        )

        .attr(
            "x",
            chartWidth / 2
        )

        .attr(
            "y",
            chartHeight + 50
        )

        .attr(
            "text-anchor",
            "middle"
        )

        .text(
            "Study Hours"
        );


    // Y Label

    chart.append("text")

        .attr(
            "class",
            "axis-label"
        )

        .attr(
            "transform",
            "rotate(-90)"
        )

        .attr(
            "x",
            -chartHeight / 2
        )

        .attr(
            "y",
            -50
        )

        .attr(
            "text-anchor",
            "middle"
        )

        .text(
            "Test Score"
        );

}


function createHospitalChart() {

    const width = 1050;

    const height = 500;

    const margin = {

        top: 30,

        right: 40,

        bottom: 65,

        left: 75

    };


    const chartWidth =
        width -
        margin.left -
        margin.right;


    const chartHeight =
        height -
        margin.top -
        margin.bottom;


    const svg =
        d3.select("#hospitalChart")

        .append("svg")

        .attr(
            "viewBox",
            `0 0 ${width} ${height}`
        )

        .attr(
            "width",
            "100%"
        )

        .attr(
            "height",
            height
        );


    const chart =
        svg.append("g")

        .attr(
            "transform",
            `translate(
                ${margin.left},
                ${margin.top}
            )`
        );


    const departments = [

        "Emergency",

        "Surgery",

        "Pediatrics",

        "General"

    ];


    // X

    const x =
        d3.scaleLinear()

        .domain(
            d3.extent(
                hospitalData,
                d => d.year
            )
        )

        .range(
            [0, chartWidth]
        );


    // Stack

    const stack =
        d3.stack()

        .keys(
            departments
        );


    const stackedData =
        stack(
            hospitalData
        );


    // Y

    const maxY =
        d3.max(
            stackedData,
            layer =>
                d3.max(
                    layer,
                    d => d[1]
                )
        );


    const y =
        d3.scaleLinear()

        .domain(
            [0, maxY]
        )

        .nice()

        .range(
            [chartHeight, 0]
        );


    // Colors

    const color =
        d3.scaleOrdinal()

        .domain(
            departments
        )

        .range(
            [
                "#ef4444",
                "#3b82f6",
                "#f59e0b",
                "#10b981"
            ]
        );


    // Grid

    chart.append("g")

        .attr(
            "class",
            "grid"
        )

        .call(

            d3.axisLeft(y)

                .ticks(6)

                .tickSize(
                    -chartWidth
                )

                .tickFormat("")
        );


    // Area

    const area =
        d3.area()

        .x(
            d =>
                x(d.data.year)
        )

        .y0(
            d =>
                y(d[0])
        )

        .y1(
            d =>
                y(d[1])
        )

        .curve(
            d3.curveMonotoneX
        );


    // Areas

    chart.selectAll(
        ".hospital-area"
    )

        .data(
            stackedData
        )

        .enter()

        .append("path")

        .attr(
            "class",
            "hospital-area"
        )

        .attr(
            "d",
            area
        )

        .attr(
            "fill",
            d =>
                color(d.key)
        )

        .attr(
            "opacity",
            0.85
        )

        .on(
            "mousemove",
            function(event, d) {

                const [
                    mouseX
                ] =
                    d3.pointer(
                        event,
                        chart.node()
                    );


                const year =
                    Math.round(
                        x.invert(mouseX)
                    );


                const closest =
                    hospitalData.reduce(

                        (prev, curr) =>

                            Math.abs(
                                curr.year -
                                year
                            )
                            <
                            Math.abs(
                                prev.year -
                                year
                            )
                                ? curr
                                : prev
                    );


                tooltip

                    .style(
                        "opacity",
                        1
                    )

                    .html(`
                        <strong>
                            ${d.key}
                        </strong>
                        <br>
                        Year:
                        ${closest.year}
                        <br>
                        Admissions:
                        ${closest[d.key]
                            .toLocaleString()}
                    `)

                    .style(
                        "left",
                        `${event.pageX + 15}px`
                    )

                    .style(
                        "top",
                        `${event.pageY - 40}px`
                    );

            }
        )

        .on(
            "mouseout",
            function() {

                tooltip.style(
                    "opacity",
                    0
                );

            }
        );


    // X Axis

    chart.append("g")

        .attr(
            "class",
            "axis"
        )

        .attr(
            "transform",
            `translate(
                0,
                ${chartHeight}
            )`
        )

        .call(

            d3.axisBottom(x)

                .tickFormat(
                    d3.format("d")
                )
        );


    // Y Axis

    chart.append("g")

        .attr(
            "class",
            "axis"
        )

        .call(

            d3.axisLeft(y)

                .ticks(6)

                .tickFormat(
                    d3.format(",")
                )
        );


    // X Label

    chart.append("text")

        .attr(
            "class",
            "axis-label"
        )

        .attr(
            "x",
            chartWidth / 2
        )

        .attr(
            "y",
            chartHeight + 50
        )

        .attr(
            "text-anchor",
            "middle"
        )

        .text(
            "Year"
        );


    // Y Label

    chart.append("text")

        .attr(
            "class",
            "axis-label"
        )

        .attr(
            "transform",
            "rotate(-90)"
        )

        .attr(
            "x",
            -chartHeight / 2
        )

        .attr(
            "y",
            -55
        )

        .attr(
            "text-anchor",
            "middle"
        )

        .text(
            "Number of Patient Admissions"
        );


    // Legend

    const legend =
        d3.select(
            "#hospitalLegend"
        );


    departments.forEach(
        department => {

            const item =
                legend

                    .append("div")

                    .attr(
                        "class",
                        "legend-item"
                    );


            item.append("div")

                .attr(
                    "class",
                    "legend-color"
                )

                .style(
                    "background",
                    color(department)
                );


            item.append("span")

                .text(
                    department
                );

        }
    );

}


createAgeChart();

createStudentChart();

createHospitalChart();