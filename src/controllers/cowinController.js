let axios = require("axios");

let getStates = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
    };
    let result = await axios(options);
    console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getDistricts = async function (req, res) {
  try {
    let id = req.params.stateId;
    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`,
    };
    let result = await axios(options);
    console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getByPin = async function (req, res) {
  try {
    let pin = req.query.pincode;
    let date = req.query.date;
    console.log(`query params are: ${pin} ${date}`);
    var options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`,
    };
    let result = await axios(options);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let getOtp = async function (req, res) {
  try {
    let blahhh = req.body;

    console.log(`body is : ${blahhh} `);
    var options = {
      method: "post",
      url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
      data: blahhh,
    };

    let result = await axios(options);
    console.log(result.data);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

let appointment = async function (req, res) {
  try {
    let districtId = req.query.district_id;
    let date = req.query.date;
    let options = {
      method: "get",
      url: ` https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`,
    };
    let result = await axios(options);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

let openWheather = async function (req, res) {
  try {
    let location = req.query.q;
    let appId = req.query.appid;
    let options = {
      method: "get",
      url: ` http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appId}`,
    };
    let result = await axios(options);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const sortTemp = async (req, res) => {
  try {
    const cities = [
      "bengaluru",
      "mumbai",
      "delhi",
      "kolkata",
      "chennai",
      "london",
      "moscow",
    ];
    const temprature = [];
    for (let i = 0; i < cities.length; i++) {
      let obj = { city: cities[i] };
      let response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=56fbe351d02d70ca75035fec2d64d1d8`
      );
      obj.temp = response.data.main.temp;
      temprature.push(obj);
    }
    let sorted = temprature.sort(function (a, b) {
      return a.temp - b.temp;
    });
    res.status(200).send({ status: true, data: sorted });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

let editMeme = async function (req, res) {
  try {
    let memeId = req.query.template_id;
    let text0 = req.query.text0;
    let text1 = req.query.text1;
    let username = req.query.username;
    let password = req.query.password;
    let options = {
      method: "post",
      url: ` https://api.imgflip.com/caption_image?template_id=${memeId}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`,
    };
    let result = await axios(options);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports.getStates = getStates;
module.exports.getDistricts = getDistricts;
module.exports.getByPin = getByPin;
module.exports.getOtp = getOtp;
module.exports.appointment = appointment;
module.exports.openWheather = openWheather;
module.exports.sortTemp = sortTemp;
module.exports.editMeme = editMeme;
