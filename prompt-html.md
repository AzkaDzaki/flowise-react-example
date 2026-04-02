Here is the chart you requested.

<artifact type="application/vnd.ant.html" title="Sample Sales Chart">
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Telkom International Group — P&amp;L Dashboard 2025-11</title>
    <style>
        :root {
            --bg: #f6f7fb;
            --fg: #101423;
            --muted: #5b6475;
            --card: #ffffff;
            --accent: #3b82f6;
            --border: rgba(0,0,0,0.08);
            --radius: 14px;
            --gap: 14px;
            --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
        }
        body { margin: 0; font-family: var(--font); background: var(--bg); color: var(--fg); }
        .wrap { max-width: 1280px; margin: 0 auto; padding: 18px; }
        header { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
        h1 { margin: 0; font-size: 22px; letter-spacing: .2px; }
        .meta { color: var(--muted); font-size: 12px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--gap); }
        .col { display: flex; flex-direction: column; gap: var(--gap); }
        .card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 14px 12px; box-shadow: 0 4px 14px rgba(0,0,0,.07); }
        .card h2 { margin: 0 0 5px; font-size: 13.5px; font-weight: 600; color: var(--fg); }
        .desc { margin: 0 0 10px; font-size: 12px; color: var(--muted); line-height: 1.35; }
        .kpi { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
        .kpi .value { font-size: 28px; font-weight: 700; letter-spacing: .2px; }
        .kpi .unit { font-size: 12px; color: var(--muted); }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { padding: 6px 8px; border-bottom: 1px solid var(--border); text-align: left; }
        th { color: var(--muted); font-weight: 600; }
        .footnote { margin-top: 14px; font-size: 12px; color: var(--muted); }
        .tag { display: inline-block; padding: 2px 8px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); font-size: 11px; }
        .filters { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
        .chart { width: 100%; height: 300px; }

        /* ── Filter bar ── */
        .filter-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 12px;
            padding: 11px 16px;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            margin-bottom: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,.05);
        }
        .filter-bar-label {
            font-size: 12px;
            font-weight: 600;
            color: var(--muted);
            white-space: nowrap;
            margin-right: 4px;
        }
        .filter-group {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .filter-group label {
            font-size: 12px;
            color: var(--muted);
            white-space: nowrap;
            font-weight: 500;
        }
        .filter-select {
            font-size: 12px;
            padding: 5px 30px 5px 10px;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--bg);
            color: var(--fg);
            cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23888'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 10px center;
            transition: border-color .15s;
        }
        .filter-select:hover  { border-color: var(--accent); }
        .filter-select:focus  { outline: 2px solid var(--accent); outline-offset: 1px; border-color: var(--accent); }
        .filter-reset-btn {
            margin-left: auto;
            font-size: 12px;
            padding: 5px 14px;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: transparent;
            color: var(--muted);
            cursor: pointer;
            transition: all .15s;
        }
        .filter-reset-btn:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

        /* ── Per-component insight box ── */
        .insight-box {
            display: flex;
            align-items: flex-start;
            gap: 7px;
            margin-top: 12px;
            padding: 9px 11px;
            background: color-mix(in srgb, var(--accent) 10%, transparent);
            border-left: 3px solid var(--accent);
            border-radius: 6px;
            font-size: 12px;
            color: var(--muted);
            line-height: 1.55;
        }
        .insight-icon { flex-shrink: 0; font-size: 13px; }

        /* ── Global insight section ── */
        .global-insights {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--gap);
            margin-top: var(--gap);
        }
        .insight-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-left: 4px solid var(--accent);
            border-radius: var(--radius);
            padding: 18px 20px;
            box-shadow: 0 4px 14px rgba(0,0,0,.07);
        }
        .insight-card h3 { margin: 0 0 10px; font-size: 14px; font-weight: 600; color: var(--fg); }
        .insight-card p  { margin: 0; font-size: 13px; color: var(--muted); line-height: 1.65; white-space: pre-line; }

        @media (max-width: 1000px) {
            .grid, .global-insights { grid-template-columns: 1fr; }
            .filter-bar { gap: 8px; }
            .filter-reset-btn { margin-left: 0; }
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
</head>
<body>
    <div class="wrap">
        <header>
            <div>
                <h1>Telkom International Group — P&amp;L Dashboard 2025-11</h1>
                <div class="meta">2024-12 — 2025-11</div>
            </div>
            <div class="filters"><span class="tag">company: Telkom International Group</span>
<span class="tag">period: 2025-11</span>
<span class="tag">currency: IDR (Billions)</span></div>
        </header>

        <div class="filter-bar"><span class="filter-bar-label">🔍 Filters</span><div class="filter-group"><label for="fsel_div">Division</label><select id="fsel_div" class="filter-select" data-field="div" data-targets="[&quot;tbl_division&quot;, &quot;ch_rev_div&quot;]" onchange="applyFilters()"><option value="__all__">All</option><option value="TELIN">TELIN</option><option value="TSAT">TSAT</option><option value="DMT">DMT</option><option value="DWS">DWS</option><option value="TIF">TIF</option></select></div><div class="filter-group"><label for="fsel_metric">Metric</label><select id="fsel_metric" class="filter-select" data-field="metric" data-targets="[&quot;ch_pl_bar&quot;]" onchange="applyFilters()"><option value="__all__">All</option><option value="REVENUE">REVENUE</option><option value="EBITDA">EBITDA</option><option value="EBIT">EBIT</option><option value="NET INCOME">NET INCOME</option></select></div><button class="filter-reset-btn" onclick="resetFilters()">Reset</button></div>

        <div class="grid">
            <div class="col" id="col-left"><div class="card">
  <h2>Revenue 2025-11</h2>
  <p class="desc">Consolidated MTD revenue — all subsidiaries</p>
  <div class="kpi">
    <div class="value" id="kpi_val_kpi_rev">413,461</div>
    <div class="unit">IDR B</div>
  </div>
  <div class="insight-box"><span class="insight-icon">💡</span>Achievement: 89.9% of target (IDR 459946.6B). Below plan by IDR 46485.6B.</div>
</div>
<div class="card">
  <h2>Revenue Trend — Actual vs Target</h2>
  <p class="desc">Monthly MTD revenue over last 12 months (IDR B)</p>
  <div id="chart_left_2_ch_rev_trend" class="chart"></div>
  <div class="insight-box"><span class="insight-icon">💡</span>Latest month actual (below target). Peak revenue: IDR 413461.0B. Trend is upward.</div>
</div>
<div class="card">
  <h2>COE Breakdown by Category</h2>
  <p class="desc">Top cost of operations categories, 2025-11 (IDR B)</p>
  <div id="chart_left_3_ch_coe" class="chart"></div>
  <div class="insight-box"><span class="insight-icon">💡</span>&#x27;Direct Cost&#x27; is the largest cost driver at IDR 51044.5B. Top-8 COE total: IDR 123274.2B.</div>
</div></div>
            <div class="col" id="col-middle"><div class="card">
  <h2>EBITDA 2025-11</h2>
  <p class="desc">Consolidated EBITDA — all subsidiaries</p>
  <div class="kpi">
    <div class="value" id="kpi_val_kpi_ebitda">298,793.4</div>
    <div class="unit">IDR B</div>
  </div>
  <div class="insight-box"><span class="insight-icon">💡</span>EBITDA margin: 72.3%. Reflects cost management across all operating divisions.</div>
</div>
<div class="card">
  <h2>Revenue by Division</h2>
  <p class="desc">MTD revenue actual vs target per subsidiary, 2025-11 (IDR B)</p>
  <div id="chart_middle_2_ch_rev_div" class="chart"></div>
  <div class="insight-box"><span class="insight-icon">💡</span>DWS leads with IDR 276806.9B revenue. Group total: IDR 413461.0B.</div>
</div>
<div class="card">
  <h2>EBITDA Margin Trend</h2>
  <p class="desc">Monthly EBITDA margin (%) — last 12 months</p>
  <div id="chart_middle_3_ch_margin" class="chart"></div>
  <div class="insight-box"><span class="insight-icon">💡</span>Margin range: 58.2% – 72.3%. Latest: 72.3%.</div>
</div></div>
            <div class="col" id="col-right"><div class="card">
  <h2>Net Income 2025-11</h2>
  <p class="desc">Consolidated net income after tax &amp; minority interest</p>
  <div class="kpi">
    <div class="value" id="kpi_val_kpi_ni">244,218.8</div>
    <div class="unit">IDR B</div>
  </div>
  <div class="insight-box"><span class="insight-icon">💡</span>NI margin: 59.1% of revenue. Impacted by depreciation, tax, and non-controlling interest.</div>
</div>
<div class="card">
  <h2>P&amp;L Summary — Actual vs Target</h2>
  <p class="desc">Revenue, EBITDA, EBIT, Net Income vs target, 2025-11 (IDR B)</p>
  <div id="chart_right_2_ch_pl_bar" class="chart"></div>
  <div class="insight-box"><span class="insight-icon">💡</span>Grouped comparison reveals where the group over/underperforms across the P&amp;L structure.</div>
</div>
<div class="card">
  <h2>Division P&amp;L Summary</h2>
  <p class="desc">Revenue, EBITDA, NI per subsidiary, 2025-11 (IDR B)</p>
  <div style="overflow:auto;">
    <table>
      <thead><tr><th>div</th><th>Rev_B</th><th>EBITDA_B</th><th>NI_B</th><th>EBITDA_%</th><th>Rev_Ach%</th></tr></thead>
      <tbody id="tbody_tbl_division">
        <tr><td>TELIN</td><td>863.3</td><td>132.3</td><td>72.8</td><td>15.3%</td><td>-</td></tr><tr><td>TSAT</td><td>7192.7</td><td>-2156.6</td><td>-5679.5</td><td>-30.0%</td><td>26.3%</td></tr><tr><td>DMT</td><td>88952.9</td><td>71130.8</td><td>21033.1</td><td>80.0%</td><td>96.2%</td></tr><tr><td>DWS</td><td>276806.9</td><td>222240.2</td><td>222240.2</td><td>80.3%</td><td>92.6%</td></tr><tr><td>TIF</td><td>39645.2</td><td>7446.7</td><td>6552.3</td><td>18.8%</td><td>96.2%</td></tr>
      </tbody>
    </table>
  </div>
  <div class="insight-box"><span class="insight-icon">💡</span>TELIN leads in revenue (IDR 863.3B). Division with best EBITDA margin: DWS.</div>
</div></div>
        </div>

        <div class="global-insights"><div class="insight-card"><h3>&#128202; Overall Summary</h3><p>In 2025-11, Telkom International Group posted consolidated Revenue of IDR 413461.0B vs target IDR 459946.6B (89.9% achievement). EBITDA of IDR 298793.4B reflects an EBITDA margin of 72.3%. Net Income reached IDR 244218.8B (59.1% NI margin). Over the last 12 months, the highest revenue was IDR 413461.0B.</p></div>
<div class="insight-card"><h3>&#127919; Future Strategies</h3><p>1. Close the revenue-vs-target gap by accelerating sales pipelines in underperforming divisions.
2. Protect EBITDA margin: review top COE categories for procurement &amp; efficiency gains.
3. Diversify Revenue mix — increase Digital Platform and Connectivity contributions.
4. Strengthen monthly target-setting accuracy using 3-year rolling actuals trend.
5. Benchmark division NI margins; share best practices from highest-performing units.</p></div></div>

        <div class="footnote">Source: train_data_wins.csv | MTD figures | Currency: IDR Billions</div>
    </div>

    <script>
        
var _DASH_INSTANCES = {};
var _fmtNum = function(v) {
  if (v === null || v === undefined) return String(v);
  var a = Math.abs(v);
  if (a >= 1e12) return (v/1e12).toFixed(1).replace(/\.0$/,'') + 'T';
  if (a >= 1e9)  return (v/1e9 ).toFixed(1).replace(/\.0$/,'') + 'B';
  if (a >= 1e6)  return (v/1e6 ).toFixed(1).replace(/\.0$/,'') + 'M';
  if (a >= 1e3)  return (v/1e3 ).toFixed(0) + 'K';
  return String(v);
};
function _buildOption(raw, cfg) {
  var cols = raw.columns, rows = raw.rows;
  var st = cfg.seriesType || 'line';
  var xCol = cfg.x || (cols.length > 0 ? cols[0] : null);
  var yCols = cfg.y || (cols.length > 1 ? [cols[1]] : []);
  var stack = cfg.stack || false;
  var ci = {};
  cols.forEach(function(c,i){ ci[c]=i; });
  var xi = xCol && ci[xCol] !== undefined ? ci[xCol] : 0;
  var xVals = rows.map(function(r){ return r[xi]; });
  if (st === 'pie') {
    var yi = yCols[0] && ci[yCols[0]] !== undefined ? ci[yCols[0]] : 1;
    return { tooltip:{trigger:'item'}, legend:{type:'scroll'},
      series:[{type:'pie',radius:['35%','70%'],data:rows.map(function(r){return{name:r[xi],value:r[yi]};})}]};
  }
  if (st === 'scatter') {
    var xi2 = xi, yi2 = yCols[0] && ci[yCols[0]] !== undefined ? ci[yCols[0]] : 1;
    return { tooltip:{trigger:'item'}, grid:{left:'8%',right:'6%',top:40,bottom:40},
      xAxis:{type:'value',axisLabel:{formatter:_fmtNum}},
      yAxis:{type:'value',axisLabel:{formatter:_fmtNum}},
      series:[{type:'scatter',data:rows.map(function(r){return[r[xi2],r[yi2]];})}]};
  }
  var series = [];
  yCols.forEach(function(y){
    if (ci[y] === undefined) return;
    var yi = ci[y];
    var s = {type:st, name:y, data:rows.map(function(r){return r[yi];})};
    if (stack && (st==='bar'||st==='line')) s.stack='total';
    series.push(s);
  });
  return { tooltip:{trigger:'axis'}, legend:{type:'scroll'},
    grid:{left:'13%',right:'6%',top:40,bottom:60,containLabel:true},
    xAxis:{type:'category',data:xVals,axisLabel:{rotate:30,hideOverlap:false}},
    yAxis:{type:'value',axisLabel:{formatter:_fmtNum}}, series:series };
}
function _filterRows(rows, cols, active) {
  return rows.filter(function(row){
    return Object.keys(active).every(function(field){
      var i = cols.indexOf(field);
      if (i < 0) return true;
      return String(row[i]) === active[field];
    });
  });
}
function applyFilters() {
  var active = {};
  document.querySelectorAll('.filter-select').forEach(function(sel){
    if (sel.value !== '__all__') active[sel.dataset.field] = sel.value;
  });
  var affected = {};
  document.querySelectorAll('.filter-select').forEach(function(sel){
    var tgts = JSON.parse(sel.dataset.targets || '[]');
    tgts.forEach(function(id){ affected[id] = true; });
  });
  Object.keys(affected).forEach(function(compId){
    var raw = _DASH_RAW[compId];
    if (!raw) return;
    var filtered = _filterRows(raw.rows, raw.columns, active);
    var fd = {columns: raw.columns, rows: filtered};
    if (raw.type === 'chart') {
      var inst = _DASH_INSTANCES[compId];
      var cfg  = _DASH_CHART_CONFIGS[compId] || {};
      if (inst) inst.setOption(_buildOption(fd, cfg), {replaceMerge:['series']});
    } else if (raw.type === 'table') {
      var tbody = document.getElementById('tbody_' + compId);
      if (tbody) {
        var h = '';
        filtered.forEach(function(row){
          h += '<tr>' + row.map(function(v){
            return '<td>' + String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</td>';
          }).join('') + '</tr>';
        });
        tbody.innerHTML = h;
      }
    } else if (raw.type === 'metric') {
      var el = document.getElementById('kpi_val_' + compId);
      if (el && filtered.length > 0) el.textContent = filtered[0][0];
    }
  });
}
function resetFilters() {
  document.querySelectorAll('.filter-select').forEach(function(sel){ sel.value = '__all__'; });
  applyFilters();
}

var _DASH_RAW = {"kpi_rev": {"type": "metric", "columns": ["value"], "rows": [[413461.0]]}, "kpi_ebitda": {"type": "metric", "columns": ["value"], "rows": [[298793.4]]}, "kpi_ni": {"type": "metric", "columns": ["value"], "rows": [[244218.8]]}, "ch_rev_trend": {"type": "chart", "columns": ["month", "Actual", "Target"], "rows": [["2024-12", 5312.7, 0.0], ["2025-01", 5025.1, 2587.5], ["2025-02", 4915.8, 2584.1], ["2025-03", 5142.8, 2608.3], ["2025-04", 4920.3, 2625.8], ["2025-05", 4969.2, 2662.5], ["2025-06", 5210.9, 2666.9], ["2025-07", 4923.7, 2650.7], ["2025-08", 5018.1, 2679.4], ["2025-09", 4661.2, 2714.8], ["2025-10", 8307.1, 7874.2], ["2025-11", 413461.0, 459946.6]]}, "ch_rev_div": {"type": "chart", "columns": ["div", "Actual", "Target"], "rows": [["DWS", 276806.9, 298924.0], ["DMT", 88952.9, 92474.1], ["TIF", 39645.2, 41206.0], ["TSAT", 7192.7, 27342.5], ["TELIN", 863.3, 0.0]]}, "ch_pl_bar": {"type": "chart", "columns": ["metric", "Actual", "Target"], "rows": [["REVENUE", 413461.0, 459946.6], ["EBITDA", 298793.4, 331514.5], ["EBIT", 263745.3, 369823.3], ["NET INCOME", 244218.8, 394889.1]]}, "ch_coe": {"type": "chart", "columns": ["category", "cost"], "rows": [["Direct Cost", 51044.5], ["Operation & Maintenance", 32213.5], ["Interconnection", 15244.3], ["Indirect Cost", 7328.2], ["Personel", 6064.8], ["Managed Service", 6031.4], ["Marketing", 3108.6], ["Office cost", 2238.9]]}, "ch_margin": {"type": "chart", "columns": ["month", "margin_%"], "rows": [["2024-12", 59.0], ["2025-01", 58.4], ["2025-02", 59.1], ["2025-03", 60.4], ["2025-04", 59.6], ["2025-05", 59.0], ["2025-06", 58.2], ["2025-07", 60.9], ["2025-08", 60.4], ["2025-09", 60.6], ["2025-10", 70.3], ["2025-11", 72.3]]}, "tbl_division": {"type": "table", "columns": ["div", "Rev_B", "EBITDA_B", "NI_B", "EBITDA_%", "Rev_Ach%"], "rows": [["TELIN", 863.3, 132.3, 72.8, "15.3%", "-"], ["TSAT", 7192.7, -2156.6, -5679.5, "-30.0%", "26.3%"], ["DMT", 88952.9, 71130.8, 21033.1, "80.0%", "96.2%"], ["DWS", 276806.9, 222240.2, 222240.2, "80.3%", "92.6%"], ["TIF", 39645.2, 7446.7, 6552.3, "18.8%", "96.2%"]]}};
var _DASH_CHART_CONFIGS = {"ch_rev_trend": {"seriesType": "line", "x": "month", "y": ["Actual", "Target"], "category": null, "stack": false}, "ch_rev_div": {"seriesType": "bar", "x": "div", "y": ["Actual", "Target"], "category": null, "stack": false}, "ch_pl_bar": {"seriesType": "bar", "x": "metric", "y": ["Actual", "Target"], "category": null, "stack": false}, "ch_coe": {"seriesType": "bar", "x": "category", "y": ["cost"], "category": null, "stack": false}, "ch_margin": {"seriesType": "line", "x": "month", "y": ["margin_%"], "category": null, "stack": false}};

(function(){
  var el = document.getElementById("chart_left_2_ch_rev_trend");
  if(!el) return;
  var chart = echarts.init(el);
  _DASH_INSTANCES["ch_rev_trend"] = chart;
  var option = {"tooltip": {"trigger": "axis"}, "legend": {"type": "scroll"}, "grid": {"left": "13%", "right": "6%", "top": 40, "bottom": 60, "containLabel": true}, "xAxis": {"type": "category", "data": ["2024-12", "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09", "2025-10", "2025-11"]}, "yAxis": {"type": "value"}, "series": [{"type": "line", "name": "Actual", "data": [5312.7, 5025.1, 4915.8, 5142.8, 4920.3, 4969.2, 5210.9, 4923.7, 5018.1, 4661.2, 8307.1, 413461.0]}, {"type": "line", "name": "Target", "data": [0.0, 2587.5, 2584.1, 2608.3, 2625.8, 2662.5, 2666.9, 2650.7, 2679.4, 2714.8, 7874.2, 459946.6]}]};
  if (option.yAxis) {
    option.yAxis.axisLabel = option.yAxis.axisLabel || {};
    option.yAxis.axisLabel.formatter = _fmtNum;
  }
  if (option.xAxis && option.xAxis.type === 'category') {
    option.xAxis.axisLabel = option.xAxis.axisLabel || {};
    option.xAxis.axisLabel.rotate = 30;
    option.xAxis.axisLabel.hideOverlap = true;
  }
  chart.setOption(option);
  window.addEventListener("resize", function(){ chart.resize(); });
})();
(function(){
  var el = document.getElementById("chart_left_3_ch_coe");
  if(!el) return;
  var chart = echarts.init(el);
  _DASH_INSTANCES["ch_coe"] = chart;
  var option = {"tooltip": {"trigger": "axis"}, "legend": {"type": "scroll"}, "grid": {"left": "13%", "right": "6%", "top": 40, "bottom": 60, "containLabel": true}, "xAxis": {"type": "category", "data": ["Direct Cost", "Operation & Maintenance", "Interconnection", "Indirect Cost", "Personel", "Managed Service", "Marketing", "Office cost"]}, "yAxis": {"type": "value"}, "series": [{"type": "bar", "name": "cost", "data": [51044.5, 32213.5, 15244.3, 7328.2, 6064.8, 6031.4, 3108.6, 2238.9]}]};
  if (option.yAxis) {
    option.yAxis.axisLabel = option.yAxis.axisLabel || {};
    option.yAxis.axisLabel.formatter = _fmtNum;
  }
  if (option.xAxis && option.xAxis.type === 'category') {
    option.xAxis.axisLabel = option.xAxis.axisLabel || {};
    option.xAxis.axisLabel.rotate = 30;
    option.xAxis.axisLabel.hideOverlap = true;
  }
  chart.setOption(option);
  window.addEventListener("resize", function(){ chart.resize(); });
})();
(function(){
  var el = document.getElementById("chart_middle_2_ch_rev_div");
  if(!el) return;
  var chart = echarts.init(el);
  _DASH_INSTANCES["ch_rev_div"] = chart;
  var option = {"tooltip": {"trigger": "axis"}, "legend": {"type": "scroll"}, "grid": {"left": "13%", "right": "6%", "top": 40, "bottom": 60, "containLabel": true}, "xAxis": {"type": "category", "data": ["DWS", "DMT", "TIF", "TSAT", "TELIN"]}, "yAxis": {"type": "value"}, "series": [{"type": "bar", "name": "Actual", "data": [276806.9, 88952.9, 39645.2, 7192.7, 863.3]}, {"type": "bar", "name": "Target", "data": [298924.0, 92474.1, 41206.0, 27342.5, 0.0]}]};
  if (option.yAxis) {
    option.yAxis.axisLabel = option.yAxis.axisLabel || {};
    option.yAxis.axisLabel.formatter = _fmtNum;
  }
  if (option.xAxis && option.xAxis.type === 'category') {
    option.xAxis.axisLabel = option.xAxis.axisLabel || {};
    option.xAxis.axisLabel.rotate = 30;
    option.xAxis.axisLabel.hideOverlap = true;
  }
  chart.setOption(option);
  window.addEventListener("resize", function(){ chart.resize(); });
})();
(function(){
  var el = document.getElementById("chart_middle_3_ch_margin");
  if(!el) return;
  var chart = echarts.init(el);
  _DASH_INSTANCES["ch_margin"] = chart;
  var option = {"tooltip": {"trigger": "axis"}, "legend": {"type": "scroll"}, "grid": {"left": "13%", "right": "6%", "top": 40, "bottom": 60, "containLabel": true}, "xAxis": {"type": "category", "data": ["2024-12", "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09", "2025-10", "2025-11"]}, "yAxis": {"type": "value"}, "series": [{"type": "line", "name": "margin_%", "data": [59.0, 58.4, 59.1, 60.4, 59.6, 59.0, 58.2, 60.9, 60.4, 60.6, 70.3, 72.3]}]};
  if (option.yAxis) {
    option.yAxis.axisLabel = option.yAxis.axisLabel || {};
    option.yAxis.axisLabel.formatter = _fmtNum;
  }
  if (option.xAxis && option.xAxis.type === 'category') {
    option.xAxis.axisLabel = option.xAxis.axisLabel || {};
    option.xAxis.axisLabel.rotate = 30;
    option.xAxis.axisLabel.hideOverlap = true;
  }
  chart.setOption(option);
  window.addEventListener("resize", function(){ chart.resize(); });
})();
(function(){
  var el = document.getElementById("chart_right_2_ch_pl_bar");
  if(!el) return;
  var chart = echarts.init(el);
  _DASH_INSTANCES["ch_pl_bar"] = chart;
  var option = {"tooltip": {"trigger": "axis"}, "legend": {"type": "scroll"}, "grid": {"left": "13%", "right": "6%", "top": 40, "bottom": 60, "containLabel": true}, "xAxis": {"type": "category", "data": ["REVENUE", "EBITDA", "EBIT", "NET INCOME"]}, "yAxis": {"type": "value"}, "series": [{"type": "bar", "name": "Actual", "data": [413461.0, 298793.4, 263745.3, 244218.8]}, {"type": "bar", "name": "Target", "data": [459946.6, 331514.5, 369823.3, 394889.1]}]};
  if (option.yAxis) {
    option.yAxis.axisLabel = option.yAxis.axisLabel || {};
    option.yAxis.axisLabel.formatter = _fmtNum;
  }
  if (option.xAxis && option.xAxis.type === 'category') {
    option.xAxis.axisLabel = option.xAxis.axisLabel || {};
    option.xAxis.axisLabel.rotate = 30;
    option.xAxis.axisLabel.hideOverlap = true;
  }
  chart.setOption(option);
  window.addEventListener("resize", function(){ chart.resize(); });
})();
    </script>
</body>
</html>
</artifact>

Have a great day!