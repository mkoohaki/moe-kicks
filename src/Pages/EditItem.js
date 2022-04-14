import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../form.css";

export default class EditItem extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangeBuyFrom = this.onChangeBuyFrom.bind(this);
    this.onChangeBuyPrice = this.onChangeBuyPrice.bind(this);
    this.onChangeBuyDate = this.onChangeBuyDate.bind(this);
    this.onChangeSoldPrice = this.onChangeSoldPrice.bind(this);
    this.onChangeSoldDate = this.onChangeSoldDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      type: "",
      brand: "",
      model: "",
      color: "",
      sex: "",
      size: {
        4: false,
        4.5: false,
        5: false,
        5.5: false,
        6: false,
        6.5: false,
        7: false,
        7.5: false,
        8: false,
        8.5: false,
        9: false,
        9.5: false,
        10: false,
        10.5: false,
        11: false,
        11.5: false,
        12: false,
        12.5: false,
        13: false,
        13.5: false,
        14: false,
        XS: false,
        S: false,
        M: false,
        L: false,
        XL: false,
        XXL: false,
        XXXL: false,
      },
      description: "",
      qty: 0,
      buyFrom: "",
      buyPrice: 0.0,
      buyDate: new Date(),
      soldPrice: 0.0,
      soldDate: 0,
    };
  }

  componentDidMount(e) {
    // let state = this.state;
    // state.size[e.target.value] = e.target.checked;
    axios
      .get("http://localhost:5000/items/" + this.props.match.params.id)
      .then((item) => {
        console.log(item.data);
        this.setState({
          type: item.data.type,
          brand: item.data.brand,
          model: item.data.model,
          color: item.data.color,
          sex: item.data.sex,
          // size: item.size.map(size => size.s === true),
          description: item.data.description,
          qty: item.data.qty,
          buyFrom: item.data.buyFrom,
          buyPrice: item.data.buyPrice,
          // buyDate: item.data.buyDate,
          soldPrice: item.data.soldPrice,
          soldDate: new Date(item.data.soldDate),
        });
      });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onChangeBrand(e) {
    this.setState({
      brand: e.target.value,
    });
  }
  onChangeModel(e) {
    this.setState({
      model: e.target.value,
    });
  }
  onChangeColor(e) {
    this.setState({
      color: e.target.value,
    });
  }
  onChangeSex(e) {
    this.setState({
      sex: e.target.value,
    });
  }
  onChangeSize(e) {
    let state = this.state;
    state.size[e.target.value] = e.target.checked;
    this.setState({ state });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeQty(e) {
    this.setState({
      qty: e.target.value,
    });
  }
  onChangeBuyFrom(e) {
    this.setState({
      buyFrom: e.target.value,
    });
  }
  onChangeBuyPrice(e) {
    this.setState({
      buyPrice: e.target.value,
    });
  }
  onChangeBuyDate(date) {
    this.setState({
      buyDate: date,
    });
  }
  onChangeSoldPrice(e) {
    this.setState({
      soldPrice: e.target.value,
    });
  }
  onChangeSoldDate(date) {
    this.setState({
      soldDate: date,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const item = {
      type: this.state.type,
      brand: this.state.brand,
      model: this.state.model,
      color: this.state.color,
      sex: this.state.sex,
      size: this.state.size,
      description: this.state.description,
      qty: this.state.qty,
      buyFrom: this.state.buyFrom,
      buyPrice: this.state.buyPrice,
      buyDate: this.state.buyDate,
      soldPrice: this.state.soldPrice,
      soldDate: this.state.soldDate,
    };
    axios
      .post(
        "http://localhost:5000/items/update/" + this.props.match.params.id,
        item
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div id="item">
        <h3>Editing Item</h3>
        <form onSubmit={this.onSubmit}>
          <div id="form1">
            <div className="divs">
              <label>Type</label>
              <select
                required
                value={this.state.type}
                onChange={this.onChangeType}
              >
                <option value="" defaultValue disabled hidden>
                  Select Type
                </option>
                <option>Shoes</option>
                <option>Shirt</option>
                <option>Pantalon</option>
                <option>Others</option>
              </select>
            </div>
            <div className="divs">
              <label>Brand</label>
              <input
                type="text"
                required
                value={this.state.brand}
                onChange={this.onChangeBrand}
              />
            </div>
            <div className="divs">
              <label>Model</label>
              <input
                type="text"
                required
                value={this.state.model}
                onChange={this.onChangeModel}
              />
            </div>
            <div className="divs">
              <div id="dSex">
                <label id="lRadio">Sex</label>
              </div>
              <div id="dRadio">
                <input
                  className="inputRadio"
                  type="radio"
                  value="male"
                  name="gender"
                  // checked={this.state.sex}
                  onChange={this.onChangeSex}
                />
                <label className="lRadio">Male</label>
                <input
                  className="inputRadio"
                  type="radio"
                  value="female"
                  name="gender"
                  onChange={this.onChangeSex}
                />
                <label className="lRadio">Female</label>
                <input
                  className="inputRadio"
                  type="radio"
                  value="unisex"
                  name="gender"
                  onChange={this.onChangeSex}
                />
                <label className="lRadio">Unisex</label>
              </div>
            </div>
            <div className="divs">
              <div id="dSize">
                <label>Size</label>
              </div>
              <div className="dCheckBox">
                <div id="dCheckBox1">
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="4"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">4</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="4.5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">4.5</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">5</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="5.5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">5.5</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="6"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">6</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      value="6.5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">6.5</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="7"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">7</label>
                  </div>
                </div>
                <div id="dCheckBox2">
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="7.5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">7.5</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      value="8"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">8</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="8.5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">8.5</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="9"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">9</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="9.5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">9.5</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="10"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">10</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="10.5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">10.5</label>
                  </div>
                </div>
                <div id="dCheckBox3">
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="11"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">11</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="11.5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">11.5</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="12"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">12</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="12.5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">12.5</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="13"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">13</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="13.5"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">13.5</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="14"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">14</label>
                  </div>
                </div>
                <div id="dCheckBox4">
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="XS"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">XS</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="S"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">S</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="M"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">M</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="L"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">L</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="XL"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">XL</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="XXL"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">XXL</label>
                  </div>
                  <div className="box">
                    <input
                      type="checkbox"
                      checked={this.state.size.value}
                      value="XXXL"
                      onChange={this.onChangeSize}
                    />
                    <label className="lCheckBox">XXXL</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="form2">
            <div className="divs">
              <label>Color</label>
              <input
                type="text"
                required
                value={this.state.color}
                onChange={this.onChangeColor}
              />
            </div>
            <div className="description">
              <label>Description</label>
              <input
                type="text"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>
            <div className="divs">
              <label>Quantity</label>
              <input
                type="text"
                required
                value={this.state.qty}
                onChange={this.onChangeQty}
              />
            </div>
            <div className="divs">
              <label>Buy From </label>
              <input
                type="text"
                value={this.state.buyFrom}
                onChange={this.onChangeBuyFrom}
              />
            </div>
            <div className="divs">
              <label>Buy Price </label>
              <input
                type="text"
                value={this.state.buyPrice}
                onChange={this.onChangeBuyPrice}
              />
            </div>
            <div className="divs">
              <label className="labelDate">Buy Date </label>
              <DatePicker
                className="date"
                selected={this.state.buyDate}
                onChange={this.onChangeBuyDate}
              />
            </div>
            <div className="divs">
              <label>Sold Price </label>
              <input
                type="text"
                value={this.state.soldPrice}
                onChange={this.onChangeSoldPrice}
              />
            </div>
            <div className="divs">
              <label>Sold Date </label>
              <DatePicker
                className="date"
                selected={this.state.soldDate}
                onChange={this.onChangeSoldDate}
              />
            </div>
          </div>
          <div>
            <input className="button" type="submit" value="Update Item" />
          </div>
        </form>
      </div>
    );
  }
}
