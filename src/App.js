import React, { Component } from 'react';

import Search from "./components/Search";
import LanguageToggle from "./components/non-search/LanguageToggle";
import { Translation } from "react-i18next";

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Row,
  Col,
  Container,
  Table
} from "reactstrap";

class App extends Component {
  render() {
    var data = [
      {en: "Apple", fr: "Pomme", out: "A"},
      {en: "Orange", fr: "Orange", out: "B"},
      {en: "Potato", fr: "Pomme-de-terre", out: "C"},
      {en: "Cake", fr: "Gâteau", out: "D"},
      {en: "Watermelon", fr: "Melon d'eau", out: "E"},
    ];
    return (
      <Translation ns={["translation"]}>
        {
          (t, { i18n }) => (
            <Container>

              <Row>
                <Col md="11" lg="11" />
                <Col md="1" lg="1">
                  <LanguageToggle i18n={i18n}/>
                </Col>
              </Row>
                
              <Row>
                <Col md="3" lg="3"></Col>
                <Col>
                  <Search
                    placeholder={t("search-placeholder")}
                    lang={i18n.language}
                    data={data}
                    englishKey="en"
                    frenchKey="fr"
                    outputKey="out"
                  />
                </Col>
                <Col md="3" lg="3"></Col>
              </Row>

              <Row style={{marginTop: "50px"}}>
                <Col md="12" lg="12">
                  <Table>
                    <tr>
                      <th>en</th>
                      <th>fr</th>
                      <th>output</th>
                    </tr>
                    {
                      data.map((row) => (
                        <tr>
                          <td>{row.en}</td>
                          <td>{row.fr}</td>
                          <td>{row.out}</td>
                        </tr>
                      ))
                    }
                  </Table>
                </Col>
              </Row>
              
          </Container>
        )
      }
    </Translation>
    );
  }
}

export default App;
