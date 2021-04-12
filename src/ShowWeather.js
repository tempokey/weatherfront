import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Cities from './Cities';

class ShowWeather extends React.Component{
	constructor(props) {
		super(props);
		this.state = {weather:'',cityNum:''};
		this.cities = Cities.cities;

		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}
  
	handleChange(event) {
		this.setState({
			cityNum: event.target.value
		});
	}
	
	handleSearch(event) {
		let it = this;
		let url = "http://localhost:8888/weather/";
		url += this.state.cityNum;
	    fetch(url, {
			mode: 'cors',
			headers: {'Content-Type':'application/json'},
	        method: 'GET'
	    }).then(
	        function (res) {
	        console.log(res);
	        res.json().then(function (data) {
	            console.log(data);
				if(data != null){
					it.setState({
						weather: data
					});
				}
	        })
	    });
	}
	
	render() {
		return (
			<div class="container">
				<div class="form-group row">
					<div class="col-auto">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text">城市: </div>
							</div>
							<div class="form-control">
								<select onChange={this.handleChange}>
									{this.cities.map((item,i) => <option value={item.value}>{item.city}</option>)}
								</select>
							</div>
							<div>
								<button class="btn btn-primary" onClick={this.handleSearch}>查询</button>
							</div>
						</div>
					</div>
				</div>
				<Weather weather={this.state.weather}/>
			</div>
		);
	}
}

class Weather extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">Key</th>
						<th scope="col">Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">城市</th>
						<td>{this.props.weather.city}</td>
					</tr>
					<tr>
						<th scope="row">温度</th>
						<td>{this.props.weather.temperature}</td>
					</tr>
					<tr>
						<th scope="row">日期</th>
						<td>{this.props.weather.date}</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default ShowWeather;