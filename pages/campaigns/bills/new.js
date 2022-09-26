import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";
//import pool from "../../../lib/db";

class RequestNew extends Component {
  state = {
    //initializing the states
    invoiceNumber: "",
    month: "",
    amount: "",
    loading: false,
    errorMessage: "",
  };


    componentDidMount(){
      const data= this.props.invc.slice(-1)[0];
      this.setState({
        invoiceNumber: data.inno,
        month: data.month,
        amount: data.net_payable,
      })
      console.log(data,"  aihkg ", this.state)
    }

  static async getInitialProps(props) {
    //   // this function loads the initial data
    
    const res = await fetch("http://localhost:3000/api/invc");
    const invc = await res.json();
    const { address } = props.query;

    return { address, invc };
  }



  onSubmit = async (event) => {
    event.preventDefault();

    console.log(this.props.invc.slice(-1),'<-----------');

    const campaign = Campaign(this.props.address);
    const { invoiceNumber, month, amount } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createBill(invoiceNumber, month, web3.utils.toWei(amount, "ether"))
        .send({ from: accounts[0] });
      Router.pushRoute(`/campaigns/${this.props.address}/bills`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/bills`}>
          <a>Back</a>
        </Link>
        <h3>Create a Bill</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>invoiceNumber</label>
            <Input
              value={this.state.invoiceNumber}
              // onChange={(event) =>
              //   this.setState({ invoiceNumber: event.target.value })
              // }
              label="invoice number"
              labelPosition="right"
            />
          </Form.Field>
          <Form.Field>
            <label>month</label>
            <Input
              value={this.state.month}
              //onChange={(event) => this.setState({ month: event.target.value })}
              label="month"
              labelPosition="right"
            />
          </Form.Field>
          <Form.Field>
            <label>amount</label>
            <Input
              value={this.state.amount}
              // onChange={(event) =>
              //   this.setState({ amount: event.target.value })
              // }
            label="eth"
            labelPosition="right"/>
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}


export default RequestNew;
