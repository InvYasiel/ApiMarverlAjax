google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChartHores);
google.charts.setOnLoadCallback(drawChartComic);
google.charts.setOnLoadCallback(drawChartSeries);

function drawChartHores(a) {

    /// Recoger votos heroes
    var arr = JSON.parse(localStorage.getItem('votosHeroe'));

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Votos');

    /// Foreach por cada elemento mostrar el titulo/nombre y los votos
    arr.forEach(element => {
        data.addRows([
            [element.title, element.votos],
        ]);
    });


    var options = {
        'title': 'Al pasar por cada barra puedes ver los votos ',
        'width': 470,
        'height': 250,
    };

    var graf = document.getElementById('graficos');
    var t = document.getElementById('chart_heroes');
    if (a == '3') {
        t.style = 'width:273px'
        var options = {
            'title': 'Al pasar por cada barra puedes ver los votos ',
            'width': 270,
            'height': 200,
            pieHole: 0.4,
        };
        var chart = new google.visualization.BarChart(document.getElementById('chart_heroes'));
        chart.draw(data, options);
    } else if (a == '2') {
        t.style = 'width:422px'
        var chart = new google.visualization.PieChart(document.getElementById('chart_heroes'));
        chart.draw(data, options);
    } else {
        t.style = 'width:422px'
        var options = {
            'title': 'Al pasar por cada barra puedes ver los votos',
            'width': 470,
            'height': 250,
            pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('chart_heroes'));
        chart.draw(data, options);
    }

}

function drawChartComic(a) {

    /// Recoger votos heroes
    var arr = JSON.parse(localStorage.getItem('votosComic'));

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Votos');

    /// Foreach por cada elemento mostrar el titulo/nombre y los votos
    arr.forEach(element => {
        data.addRows([
            [element.title, element.votos],
        ]);
    });


    var options = {
        'title': 'Al pasar por cada barra puedes ver los votos ',
        'width': 470,
        'height': 250,
    };

    var graf = document.getElementById('graficos');
    var t = document.getElementById('chart_comics');
    if (a == '3') {
        t.style = 'width:273px'
        var options = {
            'title': 'Al pasar por cada barra puedes ver los votos ',
            'width': 270,
            'height': 200,
            pieHole: 0.4,
        };
        var chart = new google.visualization.BarChart(document.getElementById('chart_comics'));
        chart.draw(data, options);
    } else if (a == '2') {
        t.style = 'width:422px'
        var chart = new google.visualization.PieChart(document.getElementById('chart_comics'));
        chart.draw(data, options);
    } else {
        t.style = 'width:422px'
        var options = {
            'title': 'Al pasar por cada barra puedes ver los votos',
            'width': 470,
            'height': 250,
            pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('chart_comics'));
        chart.draw(data, options);
    }

}
function drawChartSeries(a) {
    
        /// Recoger votos heroes
        var arr = JSON.parse(localStorage.getItem('votosSeries'));
    
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Votos');
    
        /// Foreach por cada elemento mostrar el titulo/nombre y los votos
        arr.forEach(element => {
            data.addRows([
                [element.title, element.votos],
            ]);
        });
    
    
        var options = {
            'title': 'Al pasar por cada barra puedes ver los votos ',
            'width': 470,
            'height': 250,
        };
    
        var graf = document.getElementById('graficos');
        var t = document.getElementById('chart_series');
        if (a == '3') {
            t.style = 'width:273px'
            var options = {
                'title': 'Al pasar por cada barra puedes ver los votos ',
                'width': 270,
                'height': 200,
                pieHole: 0.4,
            };
            var chart = new google.visualization.BarChart(document.getElementById('chart_series'));
            chart.draw(data, options);
        } else if (a == '2') {
            t.style = 'width:422px'
            var chart = new google.visualization.PieChart(document.getElementById('chart_series'));
            chart.draw(data, options);
        } else {
            t.style = 'width:422px'
            var options = {
                'title': 'Al pasar por cada barra puedes ver los votos',
                'width': 470,
                'height': 250,
                pieHole: 0.4,
            };
            var chart = new google.visualization.PieChart(document.getElementById('chart_series'));
            chart.draw(data, options);
        }
    
    }

function drawCharts(a){
    drawChartComic(a);
    drawChartHores(a);
    drawChartSeries(a);
    
}