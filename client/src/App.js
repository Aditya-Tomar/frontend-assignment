import './App.scss';
import axios from "axios";
import { useState } from 'react';

function App() {

	const [ stockData, setStockData] = useState([]);
	const [ stockSymbol, setStockSymbol] = useState("");
	const [ date, setDate ] = useState("");
	
	const [isLoading, setLoading ] = useState(false);

	function stockSymbolChange(e){
		const value = e.target.value;
		setStockSymbol(value);
	}
	
	function dateInputChange(e) {
		const value = e.target.value;
		setDate(value);
	}
	
	function search( ) {
		const url="http://localhost:5000/api/fetchStockData";
		const param={ stockSymbol, date };
		setLoading(true);
		axios.post(url, param).then( (res) => {
			if(res.data?.result){
				setStockData(res.data.result);
				setLoading(false);
			}
			else {
				throw res;
			}
		}).catch((error) => {
			
			setLoading(false);
			console.log('error: ' + error);
		  });
	}

	return (
		<div className="main-container display-flex">
			<div className="form-container">
					<form 
					className="form" 
					onSubmit={e => {
						e.preventDefault();
					}}>
						<div className="input-field-wrapper">
							<span className="input-field-wrapper" >
								<label htmlFor="stock-sym" >Stock symbol</label>
								<input type="text" id="stock-sym" placeholder="Enter Symbol" value={stockSymbol} onChange={ (e) => { stockSymbolChange(e); } }/>
							</span>
							<span className="input-field-wrapper" >
								<label htmlFor="sdate">Date</label>
								<input type="date" id="sdate" value={date} onChange={ (e) => { dateInputChange(e); } }/>
							</span>			
						</div>
						<button onClick={ search }>Submit</button>
					</form>
			</div>

			<div className="data-container">
				<div className="data-table-wrapper">
					<table style={ {padding: '0px'}}>
						<thead>
							<tr>
								<th>Open</th>
								<th>High</th>
								<th>Low</th>
								<th>Close</th>
								<th>Volume</th>
							</tr>
						</thead>
						<tbody>
							{ stockData.map(( data, index ) =>
										(
										<tr key={ index }>
											<td>{ data.o }</td>
											<td>{ data.h }</td>
											<td>{ data.l }</td>
											<td>{ data.c }</td>
											<td>{ data.v }</td>
										</tr>
										)
									) 
							}
						</tbody>
					</table>
				{ isLoading && <div> Loading... </div>  }
				</div>

			</div>
		</div>
	);
}

export default App;