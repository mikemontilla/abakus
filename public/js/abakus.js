var LoginForm = React.createClass({

	getInitialState: function(){
		return {email:"", password:""};
	},

	handleEmailChange: function(e){
		this.setState({email:e.target.value});
	},

	handlePasswordChange: function(e){
		this.setState({password:e.target.value});
	},

	render: function(){
		return (
			<form className="loginForm">
				<input
					type="text"
					placeholder="Enter your email"
					value={this.state.email}
					onChange={this.handleEmailChange} />
				<input
					type="text"
					placeholder="Type your password"
					value={this.state.password}
					onChange={this.handlePasswordChange} />
				<p id="loginMessage"></p>
				<input type="submit" value="Log in"/>
			</form>
		);
	}
});

var AccountsManager = React.createClass({

	url: "/api/movements/",
	removeUrl: "/api/movements/remove",

	getInitialState: function(){
		return {
			movements: []
		};
	},

	loadMovementsFromServer: function(){
		$.ajax({
			url: this.url,
			dataType: "json",
			cache: false,
			success: function(data){
				this.setState({
					movements: data
				});
			}.bind(this),
			error: function(xhr, status, error){
				console.error(this.url, status, error.toString());
			}.bind(this)
		});
	},

	handleMovementSubmit: function(movement){

		var movements = this.state.movements;
		movement.id = movements.length + 1;
		var newMovements = movements.concat([movement]);
		this.setState({
			movements: newMovements}
		);

		$.ajax({
			url: this.url,
			dataType: "json",
			type: "POST",
			data: movement,
			success: function(data){
				this.setState({movements: data});
			}.bind(this),
			error: function(xhr, status, error){
				this.setState({movements: movements});
				console.error(this.url, status, error.toString());
			}.bind(this)
		});
	},

	handleMovementDestroy: function(movementId){
		var movements = this.state.movements;
		var newMovements = this.state.movements.slice();
		newMovements.splice(movementId - 1, 1);
		this.setState({movements: newMovements});

		$.ajax({
			url: this.removeUrl,
			dataType: "json",
			type: "POST",
			data: {id:movementId},
			success: function(data){
				this.setState({movements:data});
			}.bind(this),
			error: function(xhr, status, error){
				this.setState({movements:movements});
				console.error(this.removeUrl, status, error.toString());
			}.bind(this)
		});
	},

	getBalance: function(){
		var balance = {};
		balance.incomes = 0;
		balance.outcomes = 0;
		this.state.movements.forEach(function(movement){
			if(movement.type === "income")
				balance.incomes += movement.amount;
			else if(movement.type === "outcome")
				balance.outcomes += movement.amount;
		});
		return balance;
	},

	componentDidMount: function(){
		this.loadMovementsFromServer();
	},

	render: function(){
		var balance = this.getBalance();
		var movementsFlag = !!this.state.movements.length;
		var message = "";
		if(!movementsFlag)
			message = "There is not movements registered";
		return (
			<div className="accountManager">
				<h1>Morion</h1>
				{!movementsFlag && <h3 id="managerMessage">{message}</h3>}
				{movementsFlag && <MovementsList onMovementDestroy={this.handleMovementDestroy} movements={this.state.movements} />}
				{movementsFlag && <BalanceDisplay incomes={balance.incomes} outcomes={balance.outcomes} />}
				<NewMovementForm onMovementSubmit={this.handleMovementSubmit} />
			</div>
		);
	}
});

var MovementsList = React.createClass({

	handleDestroy: function(movementId) {
		this.props.onMovementDestroy(movementId);
	},

	render: function(){
		var movements = this.props.movements;
		var movementsNodes = movements.map(function(movement){
			return (
				<Movement
					movement={movement}
					key={movement.id}
					onDestroy={this.handleDestroy}/>
			);
		}.bind(this));

		return (
			<table className="movementsList">
				<tbody>
					<tr className="tableHeader">
						<th>Date</th>
						<th>Description</th>
						<th>Type</th>
						<th>Value</th>
						<th>Comment</th>
					</tr>
					{movementsNodes}
				</tbody>
			</table>
		);
	}
});

var Movement = React.createClass({

	handleDestroyClick: function(){
		this.props.onDestroy(this.props.movement.id);
	},

	render: function(){
		var movementClass = classNames("movement", this.props.movement.type);
		return (
			<tr className={movementClass}>
				<td>{this.props.movement.date}</td>
				<td>{this.props.movement.description}</td>
				<td>{this.props.movement.type}</td>
				<td><span>{this.props.movement.amount}</span></td>
				<td>{this.props.movement.comment}</td>
				<div className="destroy" onClick={this.handleDestroyClick}></div>
			</tr>
		);
	}
});

var BalanceDisplay = React.createClass({

	render: function(){
		var balance =  this.props.incomes - this.props.outcomes;
		var balanceClass = (balance < 0) ? "outcome" : "income";
		return (
			<table className="balanceDisplay">
				<tbody>
					<tr className="tableHeader">
						<th>Incomes</th>
						<th>Outcomes</th>
					</tr>
					<tr>
						<td className="income"><span>{this.props.incomes}</span></td>
						<td className="outcome"><span>{this.props.outcomes}</span></td>
					</tr>
					<tr className="tableHeader">
						<th colSpan="2">Balance</th>
					</tr>
					<tr className={balanceClass}>
						<td colSpan="2"><span>{balance}</span></td>
					</tr>
				</tbody>
			</table>
		);
	}
});

var NewMovementForm = React.createClass({

	getInitialState: function(){
		return {
			description: "",
			type: "income",
			amount: 0,
			comment: ""
		};
	},

	handleSubmit: function(e){

		e.preventDefault();

		var d = {};
		d.description = this.state.description;
		d.amount = this.state.amount;
		d.comment =  this.state.comment;
		d.date = this.formatDate(new Date());
		d.type = this.state.type;

		if(!d.description || !d.amount || !d.comment)
			return;

		this.props.onMovementSubmit(d);

		var initialData = {
			description: "",
			type: "income",
			amount: 0,
			comment: ""
		};

		this.setState(initialData);
	},

	handleDescriptionChange: function(e){
		this.setState({description: e.target.value});
	},

	handleTypeChange: function(e){
		this.setState({type: e.target.value});
	},

	handleAmountChange: function(e){
		this.setState({amount: parseInt(e.target.value)});
	},

	handleCommentChange: function(e){
		this.setState({comment: e.target.value});
	},

	formatDate: function(rawDate){
		var day = rawDate.getDate();
		var month = rawDate.getMonth() + 1;
		var year = rawDate.getFullYear();

		return day + "/" + month + "/" + year;
	},

	getValueInputText: function(){
		return (this.state.amount ? this.state.amount : "");
	},

	isIncome: function(){
		return this.state.type === "income";
	},

	isOutcome: function(){
		return this.state.type === "outcome";
	},


	render: function(){
		return (
			<form className="newMovementForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
				<label for="incomeOpt">Income</label>
				<input type="radio" value="income" id="incomeOpt" checked={this.isIncome()} onChange={this.handleTypeChange} />
				<label for="outcomeOpt">Outcome</label>
				<input type="radio" value="outcome" id="outcomeOpt" checked={this.isOutcome()} onChange={this.handleTypeChange} />
				<input type="number" placeholder="Amount" value={this.getValueInputText()} onChange={this.handleAmountChange} />
				<input type="text" placeholder="Comment" value={this.state.comment} onChange={this.handleCommentChange} />
				<input type="submit" value="Add new movement"/>
			</form>
		);
	}
});

ReactDOM.render(
	<AccountsManager />,
	document.getElementById('content')
);
