import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    contractor: "",
    PN: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createDapp(this.state.minimumContribution, this.state.contractor,this.state.PN)
        .send({
          from: accounts[0],
        });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create the Project</h3>

          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Project Title</label>
              <Input
                label="name"
                labelPosition="right"
                value={this.state.PN}
                onChange={(event) =>
                  this.setState({ PN: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Bid Amount</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
           <Form.Field>
            <label>Enter wallet address of Contractor</label>
            <Input
              label="eth address"
              labelPosition="right"
              value={this.state.contractor}
              onChange={(event) =>
                this.setState({ contractor: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>

      </Layout>
    );
}
  }
export default CampaignNew;