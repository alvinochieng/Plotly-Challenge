function createchart(id) {

    d3.json("data/samples.json").then((data) => {
        console.log(data);
        
        var samples = data.samples.filter(row => row.id.toString() === id)[0];
        console.log(samples);
        
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
        
        var otuid = (samples.otu_ids.slice(0, 10)).reverse();
        console.log(otuid);

        var otus = otuid.map(row => "OTU" + row)

        var labels = samples.otu_labels.slice(0, 10);

        // horizontal bar chart

        var trace1 = {
            x:samplevalues,
            y: otus,
            text: labels,
            marker: {
                color: "purple"
            },
            type: "bar",
            orientation: "h",
        };

        var plotdata = [trace1];

        var layout = {
            title: "Top 10 OTU Found",
            yaxis:{
                tickmode: "linear",
            },

            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
              }
        }

        Plotly.newPlot("bar", plotdata, layout);

        // bubble chart

        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },

            text: samples.otu_labels
        };

        var layout2 = {
            xaxis: {
                title: "Bubble Chart"
            },
            height: 600,
            width: 800
        };
        var plotdata1 = [trace2];

        Plotly.newPlot("bubble", plotdata1, layout2);

    });
}

function selectinfo(id) {

    d3.json("data/samples.json").then((newdata) => {

        var metadata = newdata.metadata;

        console.log(metadata);

        var filtered = metadata.filter(row => row.id.toString() === id)[0];

        var demo = d3.select("#sample-metadata");

        demo.html("");

        Object.entries(filtered).forEach((key) => {
            demo.append("h5").text(key[0] + ": " + key[1] + "\n");
        });
    });
}

function newopt(id) {
    createchart(id);
    selectinfo(id);
}

function init() {

    var selected = d3.select("#selDataset");

    d3.json("data/samples.json").then((importeddata) => {
        // console.log(importeddata)

        importeddata.names.forEach(function(info) {
            selected.append("option").text(info).property("value");

        });

        createchart(importeddata.names[0]);
        selectinfo(importeddata.names[0]);
    });
}

init();