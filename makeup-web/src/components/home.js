import React, { Component } from "react";
import { Link } from "react-router-dom";

import HotCard from "./js/hotCard"; //暢銷商品卡
import OtherCard from "./js/otherCard"; //暢銷商品卡
import CreateCard from "./js/createCard"; //創建商品卡
import IMGPath from "./js/imgPath"; //引入圖片
import Ajax from "./js/ajax";
import "./css/home.css";
class Home extends Component {
	constructor() {
		super();
		this.state = {
			data: null, //底妝資料
			data2: null, //唇彩資料
			data3: null, //唇彩資料
			fData: null, //我的最愛資料
		};

		this.createCard = new CreateCard();
		this.ajax = new Ajax();
		this.imgPath = new IMGPath();
		this.slideIndex = 1;

		this.b = require.context("./images/banner", false, /\.(png|jpe?g|svg)$/);
		this.p = require.context("./images/product", false, /\.(png|jpe?g|svg)$/);

		if (sessionStorage.getItem("member")) {
			this.ajax.startListener(
				"get",
				`/myLove?cId=${JSON.parse(sessionStorage.getItem("member")).customer_id}`,
				this.uf
			);
		} else {
			this.ajax.startListener("get", "/?card=底妝", this.u);
			this.ajax.startListener("get", "/?card=客製", this.u3);
		}

		this.ajax.startListener("get", "/?card=唇彩", this.u2);

		window.scrollTo(0, 0);
	}

	//我的最愛資料更新
	uf = data => {
		this.setState({ fData: data });
		this.ajax.startListener("get", "/?card=底妝", this.u);
		this.ajax.startListener("get", "/?card=客製", this.u3);
		//console.log(data);
	};

	//所有底妝資料
	u = data => {
		//我的最愛資料合併到所有產品資料
		if (this.state.fData != null) {
			for (let l = 0; l < data.length; l++) {
				data[l].addLove = this.addLove;
				for (let k = 0; k < this.state.fData.length; k++) {
					if (this.state.fData[k].product_id === data[l].product_id) {
						data[l].f = this.state.fData[k];
						continue;
					}
				}
			}
		}

		this.setState({ data: data });
		console.log(data);
	};

	//所有唇彩資料
	u2 = data => {
		this.setState({ data2: data });
		//console.log(this.state.data2);
	};

	//所有客製資料
	u3 = data => {
		//我的最愛資料合併到所有產品資料
		if (this.state.fData != null) {
			for (let l = 0; l < data.length; l++) {
				data[l].addLove = this.addLove;
				for (let k = 0; k < this.state.fData.length; k++) {
					if (this.state.fData[k].product_id === data[l].product_id) {
						data[l].f = this.state.fData[k];
						continue;
					}
				}
			}
		}

		this.setState({ data3: data });
		console.log(this.state.data3);
	};

	getIMG = i => {
		return this.state.data2[i].img_0;
	};

	//加入、移除最愛
	addLove = (event, pid) => {
		event.preventDefault();
		let newFData = this.state.fData;
		let newData = this.state.data;

		let index = newFData.map(item => item.product_id).indexOf(pid);
		let index2 = newData.map(item => item.product_id).indexOf(pid);

		if (sessionStorage.getItem("member")) {
			let cId = JSON.parse(sessionStorage.getItem("member")).customer_id;
			let newLove = { customer_id: cId, product_id: pid };
			if (index === -1) {
				newFData.push(newLove);
				newData[index2].f = newLove;
			} else {
				newFData.splice(index, 1);
				delete newData[index2].f;
			}
			this.ajax.startListener("get", `/addLove?pId=${pid}&cId=${cId}`, this.u);
			this.setState({ fData: newFData });
			this.setState({ data: newData });
			//console.log(this.state.data);
		}
	};

	plusSlides(n) {
		this.showSlides((this.slideIndex += n));
	}

	showSlides(n) {
		var i;
		var slides = document.getElementsByClassName("mySlides");
		if (n > slides.length) {
			this.slideIndex = 1;
		}
		if (n < 1) {
			this.slideIndex = slides.length;
		}
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		slides[this.slideIndex - 1].style.display = "block";
	}

	render() {
		return (
			<main className="homeMain">
				{/*banner*/}
				<div className="topBanner">
					<div className="bannerBg">
						<img
							className="mySlides"
							src={this.imgPath.importAll(this.b)["homeBanner1.jpg"]}
							alt="banner"
						/>
						<img
							className="mySlides"
							src={this.imgPath.importAll(this.b)["homeBanner2.jpg"]}
							alt="banner"
						/>
						<img
							className="mySlides"
							src={this.imgPath.importAll(this.b)["homeBanner3.jpg"]}
							alt="banner"
						/>
					</div>
					<button
						className="prev"
						onClick={() => {
							this.plusSlides(-1);
						}}
					>
						&#10094;
					</button>
					<button
						className="next"
						onClick={() => {
							this.plusSlides(1);
						}}
					>
						&#10095;
					</button>
				</div>
				{/*banner end*/}

				{/*膚測簡述*/}
				{/*<div className="skinTest">*/}
				{/*上面折線*/}
				{/*<svg width="1324" height="14" viewBox="0 0 1324 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M886 12.3121L875.943 0L865.887 12.3121L855.83 0L845.689 12.3121L835.632 0L825.576 12.3121L815.519 0L805.462 12.3121L795.405 0L785.349 12.3121L775.208 0L765.151 12.3121L755.095 0L745.038 12.3121L734.981 0L724.924 12.3121L714.868 0L704.811 12.3121L694.67 0L684.613 12.3121L674.557 0L664.5 12.3121L654.443 0L644.387 12.3121L634.33 0L624.189 12.3121L614.132 0L604.076 12.3121L594.019 0L583.962 12.3121L573.905 0L563.849 12.3121L553.708 0L543.651 12.3121L533.595 0L523.538 12.3121L513.481 0L503.424 12.3121L493.368 0L483.311 12.3121L473.17 0L463.114 12.3121L453.057 0L443 12.3121V14L453.057 1.68794L463.114 14L473.17 1.68794L483.311 14L493.368 1.68794L503.424 14L513.481 1.68794L523.538 14L533.595 1.68794L543.651 14L553.708 1.68794L563.849 14L573.905 1.68794L583.962 14L594.019 1.68794L604.076 14L614.132 1.68794L624.189 14L634.33 1.68794L644.387 14L654.443 1.68794L664.5 14L674.557 1.68794L684.613 14L694.67 1.68794L704.811 14L714.868 1.68794L724.924 14L734.981 1.68794L745.038 14L755.095 1.68794L765.151 14L775.208 1.68794L785.349 14L795.405 1.68794L805.462 14L815.519 1.68794L825.576 14L835.632 1.68794L845.689 14L855.83 1.68794L865.887 14L875.943 1.68794L886 14V12.3121Z"
              fill="#fac1ba"></path>
            <path
              d="M443 12.3121L432.943 0L422.887 12.3121L412.83 0L402.689 12.3121L392.632 0L382.576 12.3121L372.519 0L362.462 12.3121L352.405 0L342.349 12.3121L332.208 0L322.151 12.3121L312.095 0L302.038 12.3121L291.981 0L281.924 12.3121L271.868 0L261.811 12.3121L251.67 0L241.614 12.3121L231.557 0L221.5 12.3121L211.443 0L201.386 12.3121L191.33 0L181.189 12.3121L171.132 0L161.076 12.3121L151.019 0L140.962 12.3121L130.905 0L120.849 12.3121L110.708 0L100.651 12.3121L90.5946 0L80.5378 12.3121L70.4811 0L60.4243 12.3121L50.3676 0L40.3108 12.3121L30.1703 0L20.1135 12.3121L10.0568 0L0 12.3121V14L10.0568 1.68794L20.1135 14L30.1703 1.68794L40.3108 14L50.3676 1.68794L60.4243 14L70.4811 1.68794L80.5378 14L90.5946 1.68794L100.651 14L110.708 1.68794L120.849 14L130.905 1.68794L140.962 14L151.019 1.68794L161.076 14L171.132 1.68794L181.189 14L191.33 1.68794L201.386 14L211.443 1.68794L221.5 14L231.557 1.68794L241.614 14L251.67 1.68794L261.811 14L271.868 1.68794L281.924 14L291.981 1.68794L302.038 14L312.095 1.68794L322.151 14L332.208 1.68794L342.349 14L352.405 1.68794L362.462 14L372.519 1.68794L382.576 14L392.632 1.68794L402.689 14L412.83 1.68794L422.887 14L432.943 1.68794L443 14V12.3121Z"
              fill="#fac1ba"></path>
            <path
              d="M1324 12.3121L1314.06 0L1304.11 12.3121L1294.17 0L1284.14 12.3121L1274.2 0L1264.26 12.3121L1254.31 0L1244.37 12.3121L1234.43 0L1224.48 12.3121L1214.46 0L1204.52 12.3121L1194.57 0L1184.63 12.3121L1174.69 0L1164.74 12.3121L1154.8 0L1144.86 12.3121L1134.83 0L1124.89 12.3121L1114.94 0L1105 12.3121L1095.06 0L1085.11 12.3121L1075.17 0L1065.14 12.3121L1055.2 0L1045.26 12.3121L1035.31 0L1025.37 12.3121L1015.43 0L1005.48 12.3121L995.459 0L985.515 12.3121L975.572 0L965.629 12.3121L955.686 0L945.742 12.3121L935.799 0L925.856 12.3121L915.83 0L905.886 12.3121L895.943 0L886 12.3121V14L895.943 1.68794L905.886 14L915.83 1.68794L925.856 14L935.799 1.68794L945.742 14L955.686 1.68794L965.629 14L975.572 1.68794L985.515 14L995.459 1.68794L1005.48 14L1015.43 1.68794L1025.37 14L1035.31 1.68794L1045.26 14L1055.2 1.68794L1065.14 14L1075.17 1.68794L1085.11 14L1095.06 1.68794L1105 14L1114.94 1.68794L1124.89 14L1134.83 1.68794L1144.86 14L1154.8 1.68794L1164.74 14L1174.69 1.68794L1184.63 14L1194.57 1.68794L1204.52 14L1214.46 1.68794L1224.48 14L1234.43 1.68794L1244.37 14L1254.31 1.68794L1264.26 14L1274.2 1.68794L1284.14 14L1294.17 1.68794L1304.11 14L1314.06 1.68794L1324 14V12.3121Z"
              fill="#fac1ba"></path>
          </svg>
          <br />
          <h2>3大自我膚質檢測方法大公開！</h2><br />
          <span>你知道自己是哪種類型的膚質嗎？<br />
        透過掌握自己的膚質類型，<br />
        在日常保養上可以對症下藥，<br />
        能夠選擇合適的保養品針對皮膚的需要。

      </span><br />
          <img className="ld 
    align-right slide-in" src="img/heart.svg" alt="" /><br />*/}

				{/*下面折線*/}
				{/*<svg width="1324" height="14" viewBox="0 0 1324 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M886 12.3121L875.943 0L865.887 12.3121L855.83 0L845.689 12.3121L835.632 0L825.576 12.3121L815.519 0L805.462 12.3121L795.405 0L785.349 12.3121L775.208 0L765.151 12.3121L755.095 0L745.038 12.3121L734.981 0L724.924 12.3121L714.868 0L704.811 12.3121L694.67 0L684.613 12.3121L674.557 0L664.5 12.3121L654.443 0L644.387 12.3121L634.33 0L624.189 12.3121L614.132 0L604.076 12.3121L594.019 0L583.962 12.3121L573.905 0L563.849 12.3121L553.708 0L543.651 12.3121L533.595 0L523.538 12.3121L513.481 0L503.424 12.3121L493.368 0L483.311 12.3121L473.17 0L463.114 12.3121L453.057 0L443 12.3121V14L453.057 1.68794L463.114 14L473.17 1.68794L483.311 14L493.368 1.68794L503.424 14L513.481 1.68794L523.538 14L533.595 1.68794L543.651 14L553.708 1.68794L563.849 14L573.905 1.68794L583.962 14L594.019 1.68794L604.076 14L614.132 1.68794L624.189 14L634.33 1.68794L644.387 14L654.443 1.68794L664.5 14L674.557 1.68794L684.613 14L694.67 1.68794L704.811 14L714.868 1.68794L724.924 14L734.981 1.68794L745.038 14L755.095 1.68794L765.151 14L775.208 1.68794L785.349 14L795.405 1.68794L805.462 14L815.519 1.68794L825.576 14L835.632 1.68794L845.689 14L855.83 1.68794L865.887 14L875.943 1.68794L886 14V12.3121Z"
              fill="#fac1ba"></path>
            <path
              d="M443 12.3121L432.943 0L422.887 12.3121L412.83 0L402.689 12.3121L392.632 0L382.576 12.3121L372.519 0L362.462 12.3121L352.405 0L342.349 12.3121L332.208 0L322.151 12.3121L312.095 0L302.038 12.3121L291.981 0L281.924 12.3121L271.868 0L261.811 12.3121L251.67 0L241.614 12.3121L231.557 0L221.5 12.3121L211.443 0L201.386 12.3121L191.33 0L181.189 12.3121L171.132 0L161.076 12.3121L151.019 0L140.962 12.3121L130.905 0L120.849 12.3121L110.708 0L100.651 12.3121L90.5946 0L80.5378 12.3121L70.4811 0L60.4243 12.3121L50.3676 0L40.3108 12.3121L30.1703 0L20.1135 12.3121L10.0568 0L0 12.3121V14L10.0568 1.68794L20.1135 14L30.1703 1.68794L40.3108 14L50.3676 1.68794L60.4243 14L70.4811 1.68794L80.5378 14L90.5946 1.68794L100.651 14L110.708 1.68794L120.849 14L130.905 1.68794L140.962 14L151.019 1.68794L161.076 14L171.132 1.68794L181.189 14L191.33 1.68794L201.386 14L211.443 1.68794L221.5 14L231.557 1.68794L241.614 14L251.67 1.68794L261.811 14L271.868 1.68794L281.924 14L291.981 1.68794L302.038 14L312.095 1.68794L322.151 14L332.208 1.68794L342.349 14L352.405 1.68794L362.462 14L372.519 1.68794L382.576 14L392.632 1.68794L402.689 14L412.83 1.68794L422.887 14L432.943 1.68794L443 14V12.3121Z"
              fill="#fac1ba"></path>
            <path
              d="M1324 12.3121L1314.06 0L1304.11 12.3121L1294.17 0L1284.14 12.3121L1274.2 0L1264.26 12.3121L1254.31 0L1244.37 12.3121L1234.43 0L1224.48 12.3121L1214.46 0L1204.52 12.3121L1194.57 0L1184.63 12.3121L1174.69 0L1164.74 12.3121L1154.8 0L1144.86 12.3121L1134.83 0L1124.89 12.3121L1114.94 0L1105 12.3121L1095.06 0L1085.11 12.3121L1075.17 0L1065.14 12.3121L1055.2 0L1045.26 12.3121L1035.31 0L1025.37 12.3121L1015.43 0L1005.48 12.3121L995.459 0L985.515 12.3121L975.572 0L965.629 12.3121L955.686 0L945.742 12.3121L935.799 0L925.856 12.3121L915.83 0L905.886 12.3121L895.943 0L886 12.3121V14L895.943 1.68794L905.886 14L915.83 1.68794L925.856 14L935.799 1.68794L945.742 14L955.686 1.68794L965.629 14L975.572 1.68794L985.515 14L995.459 1.68794L1005.48 14L1015.43 1.68794L1025.37 14L1035.31 1.68794L1045.26 14L1055.2 1.68794L1065.14 14L1075.17 1.68794L1085.11 14L1095.06 1.68794L1105 14L1114.94 1.68794L1124.89 14L1134.83 1.68794L1144.86 14L1154.8 1.68794L1164.74 14L1174.69 1.68794L1184.63 14L1194.57 1.68794L1204.52 14L1214.46 1.68794L1224.48 14L1234.43 1.68794L1244.37 14L1254.31 1.68794L1264.26 14L1274.2 1.68794L1284.14 14L1294.17 1.68794L1304.11 14L1314.06 1.68794L1324 14V12.3121Z"
              fill="#fac1ba"></path>
          </svg>

        </div>*/}
				{/*膚測簡述 end*/}

				{/*熱銷區塊*/}
				<div className="topSellOutside w">
					<h2>客製化商品</h2>
					<div className="topSell">{this.createCard.create(4, HotCard, this.state.data3)}</div>
				</div>

				{/*心理測驗*/}
				<div className="heartTest">
					<div className="smallCardBox">
						{/*商品小卡*/}
						<Link
							to={
								"/pd/" +
								(this.state.data2 != null ? this.state.data2[0].kindA : "") +
								"/pid=" +
								(this.state.data2 != null ? this.state.data2[0].product_id : "")
							}
							className="smallCard"
						>
							<img
								src={this.imgPath.importAll(this.p)[this.state.data2 != null ? this.getIMG(0) : ""]}
								alt="product"
							/>
							<div>
								<p>{this.state.data2 != null ? this.state.data2[0].productName : ""}</p>
							</div>
						</Link>

						{/*商品小卡*/}
						<Link
							to={
								"/pd/" +
								(this.state.data2 != null ? this.state.data2[1].kindA : "") +
								"/pid=" +
								(this.state.data2 != null ? this.state.data2[1].product_id : "")
							}
							className="smallCard"
						>
							<img
								src={this.imgPath.importAll(this.p)[this.state.data2 != null ? this.getIMG(1) : ""]}
								alt="product"
							/>
							<div>
								<p>{this.state.data2 != null ? this.state.data2[1].productName : ""}</p>
							</div>
						</Link>

						{/*商品小卡*/}
						<Link
							to={
								"/pd/" +
								(this.state.data2 != null ? this.state.data2[2].kindA : "") +
								"/pid=" +
								(this.state.data2 != null ? this.state.data2[2].product_id : "")
							}
							className="smallCard"
						>
							<img
								src={this.imgPath.importAll(this.p)[this.state.data2 != null ? this.getIMG(2) : ""]}
								alt="product"
							/>
							<div>
								<p>{this.state.data2 != null ? this.state.data2[2].productName : ""}</p>
							</div>
						</Link>
					</div>

					<div className="testText">
						<Link to="/skintest">
							<p>膚值測試</p>
						</Link>

						{/*<button>測驗</button>*/}
					</div>
				</div>

				{/*其他商品*/}
				<div className="downSellOutside w">
					<h2>底妝任2件結帳85折 滿1500再折150</h2>

					<div className="downSell">{this.createCard.create(8, OtherCard, this.state.data)}</div>
				</div>

				{/*下面廣告*/}
				<div className="banner">
					<img src={this.imgPath.importAll(this.b)["1920_480唇膏廣告圖.jpg"]} alt="banner" />
				</div>

				{/*最下面廣告*/}
				<div className="w bottomBanner">
					<img src={this.imgPath.importAll(this.b)["1200_300會員折價卷.jpg"]} alt="banner" />
					<img src={this.imgPath.importAll(this.b)["downBanner1.jpg"]} alt="banner" />
					<img src={this.imgPath.importAll(this.b)["downBanner2.jpg"]} alt="banner" />
					{/*<img src={this.imgPath.importAll(this.b)["downBanner3.jpg"]} alt="banner" />*/}
				</div>
				{/*客製化*/}
				{/*<div className="customize bottomHalf">
          <div className="customizLeft">*/}
				{/*客製化左邊*/}
				{/*<img className="slide-in align-left" src="https://picsum.photos/900/650?random=5" alt="" />
          </div>*/}
				{/*客製化右邊*/}
				{/*<div className="customizeRight">
            <span> 製作你喜歡的風格吧!</span>
            <br />
            <div className="customizRightMiddle">
              <img src="img/circle.png" alt="" />
            </div>
            <br />
            <span>擁有自己讀一無二的包裝</span>
          </div>
        </div>*/}
				{/*客製化end*/}
			</main>
		);
	}
}

export default Home;
