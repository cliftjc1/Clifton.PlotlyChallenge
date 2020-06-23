// Set path for the data
//const path = "./static/js/samples.json";
//const path = "../samples.json"
//const path = "C:/Users/jakec/Documents/DataAnalyticsBootCamp/ClassWork/vu-nsh-data-pt-02-2020-u-c/15-Interactive-Visualizations-and-Dashboards/Homework/Instructions/StarterCode/samples.json"
const path = "data/samples.json"

// Create a variable for my data promise
const dataPromise = d3.json(path);

//Let's see how this is looking
dataPromise.then(data => console.log(data));


dataPromise.then((data) => {
    //Log our data to the console as a check
    console.log(data);
    //Extract sample and name data
    const samples = data.samples;
    const names = data.names;
    //Add ids to the dropdown menu
    let dropdown = d3.select("#selDataset"); //reference the "selDataset" id in the html file
    for (var i = 0; i < names.length; i++) {
        let option = dropdown.append("option").text(names[i]);  //add all the potential names to our dropdown menu
    }

    //idk about this part yet
    // showBars(names[0]);
    // showMeta(names[0]);
    // showBubble(names[0]);
});

function optionChanged() {
    let name = d3.select("#selDataset").node().value;
    console.log(name);
    showBars(name);
    showMeta(name);
    showBubble(name);
};

//Update demographic info
function showMeta(name) {
    dataPromise.then(data => {
        const meta = d3.select("#sample-metadata");
        const panel = meta.selectAll("p");
        panel.remove();
        const intname = parseInt(name);
        const sample = data.metadata.filter(object => object.id === intname)[0];
        console.log(sample);

        Object.entries(sample).forEach(function([dict_key,dict_value]) {
            let cell = meta.append("p");
            cell.text(`${dict_key}: ${dict_value}`);
        })
    })
};


function hBars(name) {
    dataPromise.then(data => {
        const sample = data.metadata.filter(object => object.id === intname)[0];
        const trace1 = {
                y: sample.otu_ids.slice(0,10).reverse.map(object => `OTU ${object}`),
                x: sample.sample_values.slice(0,10).reverse(),
                orientation:'h',
                type: 'bar'
        };
        const plotData = [trace1];
        const layout = {
            title: "Top 10 OTUs"
        };
        Plotly.newPlot("bar",plotData,layout);

    })
}

hBars();