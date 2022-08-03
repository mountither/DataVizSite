function ppmLineGraph() {
  d3.csv("Data/annual_co2_ppm.csv", function (dataset) {
    dataset.forEach(function (d) {
      d3.keys(d).forEach(function (k) {
        d[k] = +d[k];
      });
    });

    var w = 1470;
    var h = 500;
    var padding = 70;

    var xScale = d3v5
      .scaleTime()
      .domain([
        d3.min(dataset, function (d) {
          return d.Year;
        }),
        d3.max(dataset, function (d) {
          return d.Year;
        }),
      ])
      .range([padding + 6, w - padding * 4]);

    var yScale = d3v5
      .scaleLinear()
      .domain([
        d3.min(dataset, function (d) {
          return d.average_co2_ppm;
        }),
        d3.max(dataset, function (d) {
          return d.average_co2_ppm;
        }),
      ])
      .range([h - padding - 6, 10]);

    var xAxis = d3v5
      .axisBottom()
      .scale(xScale)
      .ticks(5)
      .tickFormat(d3.format("d"));

    var yAxis = d3v5.axisLeft().scale(yScale).ticks(5);

    var line = d3v5
      .line()
      .x(function (d) {
        return xScale(d.Year);
      })
      .y(function (d) {
        return yScale(d.average_co2_ppm);
      });

    var svg = d3v5
      .select("#ppmLineGraph")
      .append("div")
      .classed("all_svg_container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 1470 500")
      .classed("all_svg_content_responsive", true)
      .append("g")
      .attr("width", w)
      .attr("height", h);

    svg.append("path").data([dataset]).attr("class", "line").attr("d", line);

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis)
      .style("font-size", "15px");

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis)
      .style("font-size", "15px");

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", w / 2.2)
      .attr("y", h)
      .text("Year")
      .attr("fill", "black");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 1)
      .attr("x", -h / 4)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Average CO2 ppm")
      .attr("fill", "black");

    var div = d3v5
      .select("body")
      .append("div")
      .attr("class", "co2_tooltip")
      .style("opacity", 0);

    var colour = [
      "#f7fcfd",
      "#e0ecf4",
      "#bfd3e6",
      "#9ebcda",
      "#8c96c6",
      "#8c6bb1",
      "#88419d",
      "#810f7c",
      "#4d004b",
    ];

    svg
      .selectAll("dot")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("cx", function (d) {
        return xScale(d.Year);
      })
      .attr("cy", function (d) {
        return yScale(d.average_co2_ppm);
      })
      .attr("fill", function (d, i) {
        if (d.average_co2_ppm >= 300 && d.average_co2_ppm < 310) {
          return colour[0];
        } else if (d.average_co2_ppm >= 310 && d.average_co2_ppm < 320) {
          return colour[1];
        } else if (d.average_co2_ppm >= 320 && d.average_co2_ppm < 330) {
          return colour[2];
        } else if (d.average_co2_ppm >= 330 && d.average_co2_ppm < 340) {
          return colour[3];
        } else if (d.average_co2_ppm >= 340 && d.average_co2_ppm < 350) {
          return colour[4];
        } else if (d.average_co2_ppm >= 350 && d.average_co2_ppm < 360) {
          return colour[5];
        } else if (d.average_co2_ppm >= 360 && d.average_co2_ppm < 370) {
          return colour[6];
        } else if (d.average_co2_ppm >= 370 && d.average_co2_ppm < 380) {
          return colour[7];
        } else if (d.average_co2_ppm >= 380) {
          return colour[8];
        }
      })
      .on("mouseover", function (d) {
        div.style("opacity", 0.9);
        div
          .html(
            "<strong>Year:</strong> " +
              d.Year +
              "<br/><strong>Co2 emissions:</strong> " +
              d.average_co2_ppm +
              " Parts per million"
          )
          .style("left", d3v5.event.pageX + "px")
          .style("top", d3v5.event.pageY - 28 + "px");
      });
  });
}

function TempLineGraph() {
  d3.csv("Data/global_temperature_indic.csv", function (data) {
    data.forEach(function (d) {
      d3.keys(d).forEach(function (k) {
        d[k] = +d[k];
      });
    });

    var width = 1470;
    var height = 500;
    var padding = 70;

    var allGroup = [
      "Land Max Temperature",
      "Land And Ocean Average Temperature",
    ];

    var svg = d3v5
      .select("#tempSelect")
      .append("div")
      .classed("all_svg_container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 1470 500")
      .classed("all_svg_content_responsive", true)
      .append("g")
      .attr("width", width)
      .attr("height", height);

    var xScale = d3v5
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d.Year;
        }),
        d3.max(data, function (d) {
          return d.Year;
        }),
      ])
      .range([padding, width - padding * 4]);

    var yScale = d3v5
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d["Land Max Temperature"];
        }),
        d3.max(data, function (d) {
          return d["Land And Ocean Average Temperature"];
        }),
      ])
      .range([height - padding, 0]);

    d3v5
      .select("#tempSelectButton")
      .selectAll("myoptions")
      .data(allGroup)
      .enter()
      .append("option")
      .attr("class", "optgroup")
      .text(function (d) {
        return d;
      })
      .attr("value", function (d) {
        return d;
      });

    var myColor = d3v5.scaleOrdinal().domain(allGroup).range(d3v5.schemeSet2);

    var xAxis = d3v5.axisBottom().scale(xScale).tickFormat(d3v5.format("d"));

    var yAxis = d3v5.axisLeft().scale(yScale).ticks(5);

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(xAxis)
      .style("font-size", "15px");

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis)
      .style("font-size", "15px");

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 2.2)
      .attr("y", height)
      .text("Year")
      .attr("fill", "black");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 1)
      .attr("x", -height / 4 + 5)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Temperture")
      .attr("fill", "black");

    var line = svg
      .append("g")
      .append("path")
      .datum(data)
      .attr(
        "d",
        d3v5
          .line()
          .curve(d3v5.curveBundle)
          .x(function (d) {
            return xScale(+d.Year);
          })
          .y(function (d) {
            return yScale(+d["Land Max Temperature"]);
          })
      )
      .attr("stroke", function (d) {
        return myColor("LandMaxTemperature");
      })
      .style("stroke-width", 4)
      .style("fill", "none");

    function update(selectedGroup) {
      var dataFilter = data.map(function (d) {
        return { Year: d.Year, value: d[selectedGroup] };
      });

      line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr(
          "d",
          d3v5
            .line()
            .curve(d3v5.curveBundle)
            .x(function (d) {
              return xScale(+d.Year);
            })
            .y(function (d) {
              return yScale(+d.value);
            })
        )
        .attr("stroke", function (d) {
          return myColor(selectedGroup);
        });
    }

    d3v5.select("#tempSelectButton").on("change", function (d) {
      var selectedOption = d3v5.select(this).property("value");

      update(selectedOption);
    });
  });
}

function NationTempLineGraph() {
  d3.csv("Data/global_temp_avg_country_wide_form.csv", function (data) {
    data.forEach(function (d) {
      d3.keys(d).forEach(function (k) {
        if (k != "Country") {
          d[k] = +d[k];
        }
      });
    });

    var width = 1500;
    var height = 500;
    var padding = 70;

    var allGroup = [];

    var headers = d3.keys(data[0]);

    for (var i = 0; i < headers.length; i++) {
      if (headers[i] != "Year") {
        allGroup.push(headers[i]);
      }
    }

    var svg = d3v5
      .select("#tempCountrySelect")
      .append("div")
      .classed("all_svg_container", true)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 1470 700")
      .classed("all_svg_content_responsive", true)
      .append("g")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + 80 + "," + 10 + ")");

    var xScale = d3v5
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return d.Year;
        }),
        d3.max(data, function (d) {
          return d.Year;
        }),
      ])
      .range([padding, width - padding * 4]);

    var yScale = d3v5
      .scaleLinear()
      .range([height - padding, 0])
      .domain([
        d3v5.min(data, function (d) {
          return d["Australia"];
        }),
        d3v5.max(data, function (d) {
          return d["Australia"];
        }),
      ]);

    d3v5
      .select("#tempCountrySelectButton")
      .selectAll("myoptions2")
      .data(allGroup)
      .enter()
      .append("option")
      .attr("class", "optgroup")
      .text(function (d) {
        return d;
      })
      .attr("value", function (d) {
        return d;
      });

    var myColor = d3v5.scaleOrdinal().domain(allGroup).range(d3v5.schemeSet2);

    var xAxis = d3v5.axisBottom().scale(xScale).tickFormat(d3v5.format("d"));

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(xAxis)
      .style("font-size", "15px");

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 2.2)
      .attr("y", height)
      .text("Year")
      .attr("fill", "black");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 1)
      .attr("x", -height / 4 + 5)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Temperture")
      .attr("fill", "black");

    var yAxis = d3v5.axisLeft().scale(yScale).ticks(6);
    svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis)
      .style("font-size", "15px");

    var line = svg
      .append("g")
      .append("path")
      .datum(data)
      .attr(
        "d",
        d3v5
          .line()
          .curve(d3v5.curveBundle)
          .x(function (d) {
            return xScale(+d.Year);
          })
          .y(function (d) {
            return yScale(d["Australia"]);
          })
      )
      .attr("stroke", function (d) {
        return myColor(d["Australia"]);
      })
      .style("stroke-width", 4)
      .style("fill", "none");

    function update(selectedGroup) {
      var dataFilter = data.map(function (d) {
        return { Year: d.Year, value: d[selectedGroup] };
      });

      yScale.domain([
        d3v5.min(data, function (d) {
          return d[selectedGroup];
        }),
        d3v5.max(data, function (d) {
          return d[selectedGroup];
        }),
      ]);
      svg
        .selectAll(".y.axis")
        .transition()
        .duration(750)
        .ease(d3v5.easeLinear)
        .call(yAxis);

      line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr(
          "d",
          d3v5
            .line()
            .curve(d3v5.curveBundle)
            .x(function (d) {
              return xScale(+d.Year);
            })
            .y(function (d) {
              return yScale(+d.value);
            })
        )
        .attr("stroke", function (d) {
          return myColor(selectedGroup);
        });
    }

    d3v5.select("#tempCountrySelectButton").on("change", function (d) {
      selectedOption = d3v5.select(this).property("value");
      update(selectedOption);
    });
  });
}

function TreeMap() {
  d3.csv("Data/all_years_nations_4_treemap.csv", function (data) {
    data.forEach(function (d) {
      d3.keys(d).forEach(function (k) {
        if (k != "Country") {
          d[k] = +d[k];
        }
      });
    });

    d3plus
      .viz()
      .container("#tree")
      .data(data)
      .type("tree_map")
      .id("Country")
      .size("Total")
      .ui([
        {
          method: "size",
          value: [
            "Cement",
            "Gas Flaring",
            "Gas Fuel",
            "Liquid Fuel",
            "Solid Fuel",
            "Per Capita",
            "Total",
          ],
        },
      ])
      .tooltip({
        share: true,
        size: false,
        stacked: true,
      })
      .font({ size: 15 })
      .time({
        value: "Year",
        solo: 2014,
      })
      .draw();
  });
}

function BarGraphWaterTop4() {
  d3.csv("Data/water_poll_Ind_top_4.csv", function (data) {
    data.forEach(function (d) {
      d3.keys(d).forEach(function (k) {
        if (
          k != "Corporation" &&
          k != "image_loc" &&
          k != "Market_Capitalisation" &&
          k != "Amount_of_toxic" &&
          k != "Industry"
        ) {
          d[k] = +d[k];
        }
      });
    });

    var width = 1700;
    var height = 700;
    var padding = 150;

    var svg = d3v5
      .select("#water_bartop4")
      .append("div")
      .classed("all_svg_container", true)
      .append("svg")
      .attr("preserveAspectRatio", "none")
      .attr("viewBox", "0 0 1700 700")
      .classed("all_svg_content_responsive", true)
      .append("g")
      .attr("width", width + padding)
      .attr("height", height + padding)
      .attr("transform", "translate(" + 50 + "," + -5 + ")");

    var x = d3v5
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.Corporation;
        })
      )
      .range([padding, width - padding])
      .padding(0);
    svg
      .append("g")
      .attr("stroke-width", "0px")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(d3v5.axisBottom(x).scale(x).tickSize(0))
      .selectAll("text")
      .attr("transform", "translate(20,8)rotate(0)")
      .style("text-anchor", "end")
      .style("font-size", "18px");

    var y = d3v5
      .scaleLinear()
      .domain([
        0,
        d3v5.max(data, function (d) {
          return d.Toxic_hazard;
        }),
      ])
      .range([height - padding, 0]);
    svg
      .append("g")
      .attr("transform", "translate(" + padding + ",0)")
      .call(d3v5.axisLeft(y).scale(y).ticks(4))
      .style("font-size", "18px");

    var defs = svg.append("defs");

    defs
      .selectAll(".logo-pattern")
      .data(data)
      .enter()
      .append("pattern")
      .attr("id", function (d) {
        return d.Corporation.toLowerCase().replace(" ", "-");
      })
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "userSpaceOnUse")
      .append("image")
      .attr("height", function (d) {
        if (d.Corporation == "Honeywell International") {
          return "40";
        } else {
          return "90";
        }
      })

      .attr("width", function (d) {
        if (d.Corporation == "Honeywell International") {
          return "150";
        } else {
          return "150";
        }
      })
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "https://www.w3.org/1999/xlink")
      .attr("xlink:href", function (d) {
        return d.image_loc;
      });

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 2)
      .attr("y", height)
      .text("Top 4 Water Polluters")
      .style("font-weight", "bold")
      .attr("fill", "black");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -50)
      .attr("x", -height / 10)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Toxics released in Water 2017 (in Pounds)")
      .style("font-weight", "bold")
      .attr("fill", "black");
    var tip = d3
      .tip()
      .attr("class", "d3-tip")
      .offset([-10, 10])
      .html(function (d) {
        return (
          "<strong>Toxins Emitted in Water:</strong> " +
          d.Amount_of_toxic +
          "</br>" +
          "<strong>Market Cap:</strong> " +
          d.Market_Capitalisation +
          "</br>" +
          "<strong>Year Established:</strong> " +
          d.Year_Established +
          "</br>" +
          "<strong>Industry:</strong> " +
          d.Industry +
          "</br>" +
          "<strong>Porportion in Top 4:</strong> " +
          d.Percentage +
          "%" +
          "</br>"
        );
      });

    svg.call(tip);

    svg
      .selectAll("#water_bartop4")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.Corporation);
      })
      .attr("y", function (d) {
        return y(d.Toxic_hazard);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height + padding - y(d.Toxic_hazard);
      })
      .attr("fill", function (d) {
        return "url(#" + d.Corporation.toLowerCase().replace(" ", "-") + ")";
      })
      .on("mouseover", function (d) {
        tip.show(d, this);
      })
      .on("mouseout", function (d) {
        tip.hide(d, this);
      });
  });
}

function BarGraphAirTop4() {
  d3.csv("Data/air_poll_Ind_top_4.csv", function (data) {
    data.forEach(function (d) {
      d3.keys(d).forEach(function (k) {
        if (
          k != "Corporation" &&
          k != "image_loc" &&
          k != "Market_Capitalisation" &&
          k != "Amount_of_toxic" &&
          k != "Industry"
        ) {
          d[k] = +d[k];
        }
      });
    });

    var width = 1500;
    var height = 700;
    var padding = 150;

    var svg = d3v5
      .select("#air_bartop4")
      .append("div")
      .classed("all_svg_container", true)
      .append("svg")
      .attr("preserveAspectRatio", "none")
      .attr("viewBox", "0 0 1700 700")
      .classed("all_svg_content_responsive", true)
      .append("g")
      .attr("width", width + padding)
      .attr("height", height + padding)
      .attr("transform", "translate(" + 50 + "," + -5 + ")");

    var x = d3v5
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.Corporation;
        })
      )
      .range([padding, width - padding])
      .padding(0);
    svg
      .append("g")
      .attr("stroke-width", "0px")
      .attr("transform", "translate(0," + (height - padding) + ")")
      .call(d3v5.axisBottom(x).scale(x).tickSize(0))
      .selectAll("text")
      .attr("transform", "translate(-10,8)rotate(0)")
      .style("text-anchor", "end")
      .style("font-size", "18px");

    var y = d3v5
      .scaleLinear()
      .domain([
        0,
        d3v5.max(data, function (d) {
          return d.Toxic_hazard;
        }),
      ])
      .range([height - padding, 0]);
    svg
      .append("g")
      .attr("transform", "translate(" + padding + ",0)")
      .call(d3v5.axisLeft(y).scale(y).ticks(4))
      .style("font-size", "18px");

    var defs = svg.append("defs");

    defs
      .selectAll(".logo-pattern2")
      .data(data)
      .enter()
      .append("pattern")
      .attr("id", function (d) {
        return d.Corporation.toLowerCase().replace(" ", "-");
      })
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("patternContentUnits", "userSpaceOnUse")
      .append("image")
      .attr("height", function (d) {
        if (d.Corporation == "LyondellBasell") {
          return "40";
        } else {
          return "100";
        }
      })
      .attr("width", function (d) {
        if (d.Corporation == "DowDuPont") {
          return "100";
        } else {
          return "150";
        }
      })
      .attr("preserveAspectRatio", "none")
      .attr("xmlns:xlink", "https://www.w3.org/1999/xlink")
      .attr("xlink:href", function (d) {
        return d.image_loc;
      });

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 2)
      .attr("y", height)
      .text("Top 4 Air Polluters")
      .style("font-weight", "bold")
      .attr("fill", "black");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -50)
      .attr("x", -height / 10)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Toxics released in Air 2017 (in Pounds)")
      .style("font-weight", "bold")
      .attr("fill", "black");

    var tip = d3
      .tip()
      .attr("class", "d3-tip")
      .offset([-10, 10])
      .html(function (d) {
        return (
          "<strong>Toxins Emitted in Air:</strong> " +
          d.Amount_of_toxic +
          "</br>" +
          "<strong>Market Cap:</strong> " +
          d.Market_Capitalisation +
          "</br>" +
          "<strong>Year Established:</strong> " +
          d.Year_Established +
          "</br>" +
          "<strong>Industry:</strong> " +
          d.Industry +
          "</br>" +
          "<strong>Porportion in Top 4:</strong> " +
          d.Percentage +
          "%" +
          "</br>"
        );
      });

    svg.call(tip);

    svg
      .selectAll("#air_bartop4")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.Corporation);
      })
      .attr("y", function (d) {
        return y(d.Toxic_hazard);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height + padding - y(d.Toxic_hazard);
      })
      .attr("fill", function (d) {
        return "url(#" + d.Corporation.toLowerCase().replace(" ", "-") + ")";
      })
      .on("mouseover", function (d) {
        tip.show(d, this);
      })
      .on("mouseout", function (d) {
        tip.hide(d, this);
      });
  });
}

function opinionBar() {
  d3.csv("Data/choices_made_to_protect_environ.csv", function (data) {
    data.forEach(function (d) {
      d3.keys(d).forEach(function (k) {
        if (k != "Action" && k != "url") {
          d[k] = +d[k];
        }
      });
    });
    var margin = { top: 100, right: 20, bottom: 380, left: 400 },
      width = 1500 - margin.left - margin.right,
      height = 1000 - margin.top - margin.bottom;

    var x = d3v5.scaleBand().range([0, width]).padding(0.1);

    var y = d3v5.scaleLinear().range([height, 0]);

    var svg = d3v5
      .select("#opinion_bar")
      .append("div")
      .classed("all_svg_container", true)
      .append("svg")
      .attr("preserveAspectRatio", "none")
      .attr("viewBox", "0 0 2000 2000")
      .classed("all_svg_content_responsive", true)
      .append("g")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(
      data.map(function (d) {
        return d.Action;
      })
    );
    y.domain([0, 40]);

    svg
      .selectAll("bar_op")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar_op")
      .attr("x", function (d) {
        return x(d.Action);
      })
      .attr("width", x.bandwidth())
      .attr("y", function (d) {
        return y(d.Percent_of_respondent);
      })
      .attr("height", function (d) {
        return height - y(d.Percent_of_respondent);
      })
      .attr("fill", "#02c39a")
      .on("mouseover", function () {
        d3v5.select(this).attr("stroke-width", 3).attr("stroke", "#f7fff7");
      })
      .on("mouseout", function () {
        d3v5.select(this).attr("stroke", "none");
      })
      .on("click", function (d) {
        window.open(d.url);
      });

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", "16px")
      .call(d3v5.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,8)rotate(-35)")
      .style("text-anchor", "end")
      .style("font-size", "18px");

    svg.append("g").style("font-size", "16px").call(d3v5.axisLeft(y));

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 1.5)
      .attr("y", margin.bottom - 50 + height)
      .text("Action committed by respondant (Open-ended)")
      .style("font-weight", "bold")
      .attr("fill", "black");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -70)
      .attr("x", -height / 5)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("% of Respondents")
      .style("font-weight", "bold")
      .attr("fill", "black");
  });
}

function ShowHeatmapImage() {
  document.getElementById("heatmap").style.display = "block";

  document.getElementsByClassName("button2 bouncy")[0].style.display = "block";
}
function HideHeatmapImage() {
  document.getElementById("heatmap").style.display = "none";
  document.getElementsByClassName("button2 bouncy")[0].style.display = "none";
  window.location.hash = "#temp_heatmap_section";
}

function NationFilteringSearch() {
  var input, filter, options, i;

  var input = document.getElementById("filterOpt");

  var filter = input.value.toUpperCase();

  var select = document.getElementById("tempCountrySelectButton");

  var options = select.getElementsByTagName("option");

  for (i = 0; i < options.length; i++) {
    txtValue = options[i].textContent || options[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      options[i].style.display = "";
    } else {
      options[i].style.display = "none";
    }
  }
}

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

function init() {
  TreeMap();

  TempLineGraph();

  NationTempLineGraph();

  ppmLineGraph();

  BarGraphWaterTop4();

  BarGraphAirTop4();

  opinionBar();
}

window.onload = init;
window.onscroll = function () {
  myFunction();
};
