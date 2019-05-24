import React, { Component } from 'react';
import {connect} from  'react-redux';
import { debounce } from "throttle-debounce";
import actionCreators from '../../store/actions/actions';
import _ from 'lodash';
/*
Auto complete component
*/

class Autocomplete extends Component{

    constructor (props){

      super(props);
      this.state = {
        showAutoComp:false,
        showContents:false,
        query:''
        
      }

      /*
      Making a debounce logic in a way that when user makes a delay of 300ms then
      it hits the server or the local data for suggestions (this approach will minimize the
      hits to the server as per key strokes) */
      this.autocompleteCurrencySearchWithDebounce = debounce(300, this.findCurrencyCode);

    }
  
  
    componentDidMount () {

        this.props.getCurrencyCodeList();
      
    }

    componentWillReceiveProps ( nextProps ) {

        if ( !_.isEqual(this.props.currency_details,nextProps.currency_details) ) {
          this.setState({showContents:true})  
        }
    }



    findTypedText = evt => {

      let bol = false;
      if ( evt.target.value.length > 0 ) {
        bol = true;
      }

      this.setState({ query: evt.target.value, showAutoComp:bol }, () => {
        
        this.autocompleteCurrencySearchWithDebounce(this.state.query);
        
      });
        
    }


    clearInput = () => {

      this.setState({query:'',showContents:false});
    }
    

    findCurrencyCode = query => {

      console.log("I'm called by debouncer when delay is more than 300ms");
      this.props.getQueryResult(query,this.props.currency_codes);

    }

   

    showCurrencyDetails = currencyCode => {

        this.setState({query:currencyCode,showAutoComp:false});
        this.props.showCurrencyDetails(currencyCode);
    }

    render() {
       
        let currencyBPIValues = [];
        let currecnyPastMonthKeys = [];
        if ( "bpi" in this.props.currency_details ){

          currencyBPIValues = Object.values(this.props.currency_details.bpi);
        }
        
        if ( "bpi" in this.props.past_month_details ){

          currecnyPastMonthKeys = Object.keys(this.props.past_month_details.bpi);
        }
        
        return (
          <div>
            <div>
              <span>
                <input 
                  type="text" 
                  id="Search" 
                  size="40" 
                  value={this.state.query} 
                  onClick={()=>{this.clearInput()}}
                  onChange={(evt)=>{this.findTypedText(evt)}} 
                  placeholder="Type a currency" 
                />
              </span>
            </div>
            <div className={(this.state.showAutoComp? "searchResults show" : "searchResults hide")}>
              {this.props.suggestions.map((item)=>{

                  return (
                    <div 
                      key={item.currency} 
                      id={item.currency} 
                      onClick={()=>this.showCurrencyDetails(item.currency)} 
                      className="searchResultItem" 
                      role="presentation"
                    >
                      <span>
                        {`${item.currency} - ${item.country}`}
                      </span>                                            
                    </div>
                  );
               })}
            </div>
            <div className={("bpi" in this.props.currency_details && this.state.showContents ? "show" : "hide")}>
              <span>
                <h1>
                    Currency Details
                </h1>
              </span>
              
              <div>
                {
                  currencyBPIValues.map((obj)=>{

                    return (
                      <p key={obj.code}>
                        Code:
                        {obj.code} 
                        | 
                        Rate:
                        {obj.rate} 
                        | 
                        Description:
                        {obj.description} 
                        | 
                        Rate float:
                        {obj.rate_float} 
                      </p>
                    )
                  })
                }
              </div>
              <div>
                <span>
                  <h1>
                    Past 1 month report
                  </h1>
                  <p>
                    {("disclaimer" in this.props.past_month_details ? 
                    this.props.past_month_details.disclaimer:"")}
                  </p>
                </span>
                {
                  currecnyPastMonthKeys.map((keyProp)=>{

                    return(
                      <p key={keyProp}>
                        <span>
                          {keyProp}
                        </span>
                        |
                        <span>
                          Rate:
                          {this.props.past_month_details.bpi[keyProp]}
                        </span>
                      </p>
                    )
                  })
                }
              </div>
            </div>
          </div>

        );
    }

    

}

const mapStateToProps = state => {

    return {

      currency_codes: state.querySearch.currency_codes,
      suggestions:state.querySearch.suggestions,
      currency_details: state.querySearch.currency_details,
      past_month_details: state.querySearch.monthly_details
           

    }

};

const mapDispatchToProps = dispatch => {

    return {

        getQueryResult: (searchTxt, codesList) => 
        dispatch(actionCreators.makeQueryToTheServer(searchTxt,codesList)),
        getCurrencyCodeList: () => dispatch(actionCreators.getCurrencyCodeList()),
        showCurrencyDetails: itemData => dispatch(actionCreators.showCurrencyDetails(itemData))
    }

}

export default connect(mapStateToProps, mapDispatchToProps) (Autocomplete);