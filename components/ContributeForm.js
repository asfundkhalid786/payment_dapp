import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    QA: "",
    value: "",
    index: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    this.setState({ loading: true, errorMessage:""});
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.funds().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message});
    }
    this.setState({ loading: false, value: ''});
  };

  onSub = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    this.setState({ loading: true, errorMessage:""});
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.giveQA(web3.utils.toWei(this.state.QA, "ether")).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);

    } catch (err) {
      this.setState({ errorMessage: err.message});
    }
    this.setState({ loading: false, value: ''});
  };




  render() {
    return (
      <><Form onSubmit={this.onSub} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Contractor plz Enter the Quaterly amount of work to be done</label>
          <Input 
            value={this.state.QA}
            onChange={(event) => this.setState({ QA: event.target.value })}
            label="ether"
            labelPosition="right" />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>OK!</Button>
      </Form>
      <br/> <br/>

      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Amount to Lock</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
              label="ether"
              labelPosition="right" />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>Secure!</Button>
        </Form>
        </>
    );
  }
}

export default ContributeForm;
