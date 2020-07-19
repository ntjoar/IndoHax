import React from 'react';
import axios from 'axios';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {item: ''}
  }

  render() {
    return (
      <li></li>
    );
  }
}

function showResult(json_data) {
  return (
    <Item />
  )
}

function cmp(a, b) {
  return a[1].localeCompare(b[1]);
}

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    /* Write Code for HTTP request here */
    let data_ = null;
    axios.get('http://localhost:3000/' + this.state.value).then(
      function(response) {
        data_ = response.data;
      }
    ) 
    console.log('reached')
    /* Parse Json */
    /* data_[0] = costco */
    /* data_[1] = walmart */
    for(var i = 0; i < data_.length; i++) {
      var store = data_[i];
      var list = [];
      for (var k = 0; k < store.items.length; k++) {
        var val = store.items[k];
        list.push([val.name, val.price, val.link]);
      }
    }
    list.sort(cmp);

    /* Sort Top 10 */
    let len = list.length;
    if (len > 10) {
      len = 10;
    }

    data_ = [];
    for(var i = 0; i < len; i++) {
      data_.push(list[i]);
    }

    console.log(data_);

    /* Output List */
    // return showResult(data_);
  }

  render() {
    return (
      <form>
        <label>
           <input type="text" name="searchbar" onChange={this.handleChange}/>
        </label>
        <button onClick={() => this.handleSubmit()}>Search</button>
      </form>
    );
  }
}

class Header extends React.Component {
  createHeader() {
    return (
    <div>
      <header id="header" className="alt">
            <div className="logo">Sugma <span>balls</span></div>
      </header>
      <section id="banner">
				<div className="inner">
					<header>
						<h1>Sugma</h1>
						<p>Find the cheapest items on your shopping cart</p>
					</header>
					<a href="#main" className="button big scrolly">Search for item</a>
				</div>
			</section>
      <div id="main">
					<section className="wrapper style1">
						<div className="inner">
								<div className="flex flex-2">
									<div className="col col1">
										<div className="image round fit">
											<a href="generic.html" className="link"><img src={require("./images/pic01.png")}/></a>
										</div>
									</div>
									<div className="col col2">
										<h3>Enter your item Here</h3>
                    <Searchbar />
									</div>
								</div>
						</div>
					</section>
			</div>
    </div>
    );
  }

  render() {
    return (
      <div>
        <div className="header">
          {this.createHeader()}
        </div>
      </div>
    );
  }
}

class Body extends React.Component {
  render() {
    return(
      <Header />
    );
  }
} 

function body() {
  return (
    <div>
      <Body />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      body()
    );
  }
}

export default App;
