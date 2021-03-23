(this["webpackJsonpvacations-project"]=this["webpackJsonpvacations-project"]||[]).push([[0],{128:function(t,e,a){},133:function(t,e,a){},134:function(t,e,a){},229:function(t,e,a){},259:function(t,e,a){},260:function(t,e,a){},261:function(t,e,a){},262:function(t,e,a){},263:function(t,e,a){"use strict";a.r(e);var n,s=a(0),o=a(1),i=a.n(o),c=a(97),r=a.n(c),l=a(3),d=a(6),u=a(8),p=a(7),h=a(15),g=a(5),m=a(2),v=a.n(m),f=a(9),b=a(4),j=a.n(b);!function(t){t[t.SAVED=0]="SAVED",t[t.DELETED=1]="DELETED",t.EDIT="Edit",t.ADD="Add"}(n||(n={}));var y,S=function t(e,a,n,s,o,i,c,r,d){Object(l.a)(this,t),this.id=e,this.destination=a,this.imageUrl=n,this.description=s,this.price=o,this.startDate=i,this.endDate=c,this.isFollowed=r,this.amountOfFollowers=d};!function(t){t[t.GetVacationsList=0]="GetVacationsList",t[t.AddNewVacation=1]="AddNewVacation",t[t.GuestTryToFollowVacation=2]="GuestTryToFollowVacation",t[t.ShowLoginModal=3]="ShowLoginModal",t[t.SetSocket=4]="SetSocket",t[t.Login=5]="Login",t[t.Logout=6]="Logout",t[t.GetVacationDetails=7]="GetVacationDetails",t[t.EditVacation=8]="EditVacation",t[t.DeleteVacation=9]="DeleteVacation",t[t.EditingVacation=10]="EditingVacation",t[t.ClearEditVacationForm=11]="ClearEditVacationForm"}(y||(y={}));var x=a(98),w=a(103);var A=Object(x.a)((function(t,e){var a,n=Object(w.a)({},t);switch(e.type){case y.GetVacationsList:n.vacations=e.payload;break;case y.GuestTryToFollowVacation:n.guestTryToFollow=e.payload;break;case y.ShowLoginModal:n.showLoginModal=e.payload;break;case y.SetSocket:n.socket=e.payload;break;case y.Login:n.loggedIn=!0;break;case y.Logout:n.loggedIn=!1;break;case y.AddNewVacation:n.vacations.push(e.payload);break;case y.DeleteVacation:a=n.vacations;for(var s=e.payload,o=0;o<a.length;o++)a[o].id===+s&&a.splice(o,1);break;case y.EditVacation:a=n.vacations;for(var i=e.payload,c=0;c<a.length;c++)a[c].id===i.id&&(i.isFollowed=a[c].isFollowed,i.amountOfFollowers=a[c].amountOfFollowers,a.splice(c,1,i));break;case y.EditingVacation:n.movedToEdit=!0;break;case y.ClearEditVacationForm:n.movedToEdit=!1;break;case y.GetVacationDetails:n.vacationDetails=e.payload}return n}),new function t(){Object(l.a)(this,t),this.vacations=[],this.newVacation=void 0,this.guestTryToFollow=!1,this.showLoginModal=!0,this.loggedIn=!1,this.socket=void 0,this.vacationDetails=void 0,this.movedToEdit=!1}),O=(a(128),function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){return Object(l.a)(this,a),e.call(this,t)}return Object(d.a)(a,[{key:"render",value:function(){var t=this.props;return Object(s.jsx)("div",{className:"modal ".concat(t.type),children:Object(s.jsx)("div",{className:"modal-content",children:Object(s.jsxs)("div",{className:"modal-header",children:[Object(s.jsx)("h2",{id:"".concat(t.type,"-msg"),children:t.msg}),"danger"===t.type&&Object(s.jsxs)("div",{className:"btns",children:[Object(s.jsx)("input",{className:"submit-btn",type:"submit",value:"Oh, no! My bad.",onClick:t.onSubmit}),Object(s.jsx)("input",{className:"delete-btn",type:"button",value:"Yes, please.",onClick:t.onDelete})]})]})})})}}]),a}(o.Component)),k=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){return Object(l.a)(this,a),e.call(this,t)}return Object(d.a)(a,[{key:"render",value:function(){var t=this.props;return Object(s.jsx)("div",{className:"nav-btn",children:Object(s.jsx)(h.b,{to:"/".concat(t.page),children:Object(s.jsx)("button",{onClick:t.function,children:t.displayText})})})}}]),a}(o.Component),I=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var s;return Object(l.a)(this,a),(s=e.call(this,t)).mode=A.getState().movedToEdit?n.EDIT:n.ADD,s.getVacationDetails=function(){var t=A.getState().vacationDetails;s.setState({id:t.id,destination:t.destination,imageUrl:t.imageUrl,description:t.description,price:t.price,startDate:t.startDate,endDate:t.endDate})},s.editVacation=function(){var t=Object(f.a)(v.a.mark((function t(e){var a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,a=new S(s.state.id,s.state.destination,s.state.imageUrl,s.state.description,s.state.price,s.state.startDate,s.state.endDate),t.next=5,j.a.put("http://localhost:3001/vacations/",a);case 5:A.dispatch({type:y.EditVacation,payload:a}),s.onSubmitSuccess(),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(1),alert(t.t0.response.data.error),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}(),s.addVacation=function(){var t=Object(f.a)(v.a.mark((function t(e){var a,n,o;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.preventDefault(),0!==s.state.price){t.next=4;break}return alert("Vacation's price cannot be free!"),t.abrupt("return");case 4:return a=A.getState().vacations,n=a[a.length-1].id+1,t.prev=6,o=new S(n,s.state.destination,s.state.imageUrl,s.state.description,s.state.price,s.state.startDate,s.state.endDate),t.next=10,j.a.post("http://localhost:3001/vacations/",o);case 10:A.dispatch({type:y.AddNewVacation,payload:o}),s.onSubmitSuccess(),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(6),alert(t.t0.response.data.error),console.log(t.t0);case 18:case"end":return t.stop()}}),t,null,[[6,14]])})));return function(e){return t.apply(this,arguments)}}(),s.onSubmitSuccess=function(){s.setState({displaySuccessModal:!0}),setTimeout((function(){s.setState({displaySuccessModal:!1}),s.resetInputs(),s.state.mode===n.EDIT&&(A.dispatch({type:y.ClearEditVacationForm}),s.props.history.push("/admin"))}),2e3)},s.state={id:null,destination:"",imageUrl:"",description:"",price:0,startDate:new Date,endDate:new Date,displaySuccessModal:!1,mode:s.mode},s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){!A.getState().loggedIn&&this.props.history.push("/admin"),this.state.mode===n.EDIT&&this.getVacationDetails()}},{key:"resetInputs",value:function(){this.setState({destination:"",imageUrl:"",description:"",price:0,startDate:null,endDate:null})}},{key:"render",value:function(){var t=this,e=this.state.mode;return Object(s.jsxs)("div",{className:"manage-vacations",children:[Object(s.jsx)(k,{page:"admin",displayText:"Back Home",function:function(){return A.dispatch({type:y.ClearEditVacationForm})}}),this.state.displaySuccessModal&&Object(s.jsx)(O,{msg:"Vacation ".concat(e===n.EDIT?"changed":"added","!"),type:"success"}),Object(s.jsxs)("form",{onSubmit:e===n.EDIT?this.editVacation:this.addVacation,className:"backdrop-form",children:[Object(s.jsxs)("h2",{children:[e," Vacation"]}),Object(s.jsx)("input",{autoFocus:!0,type:"text",placeholder:"Destination",value:this.state.destination,maxLength:60,onChange:function(e){return t.setState({destination:e.target.value})},required:!0}),Object(s.jsx)("input",{type:"text",placeholder:"Image Url",value:this.state.imageUrl,maxLength:300,onChange:function(e){return t.setState({imageUrl:e.target.value})},required:!0}),Object(s.jsx)("input",{type:"text",placeholder:"Description",value:this.state.description,maxLength:100,onChange:function(e){return t.setState({description:e.target.value})},required:!0}),Object(s.jsx)("input",{type:"number",placeholder:"Price",value:this.state.price,onChange:function(e){return t.setState({price:+e.target.value})},required:!0}),Object(s.jsx)("input",{type:"date",placeholder:"Start Date",className:"start-date",value:new Date(this.state.startDate).toISOString().split("T")[0],min:new Date((new Date).getTime()-6e4*(new Date).getTimezoneOffset()).toISOString().split("T")[0],onChange:function(e){return t.setState({startDate:new Date(e.target.value)})},required:!0}),Object(s.jsx)("input",{type:"date",placeholder:"End Date",className:"end-date",value:new Date(this.state.endDate).toISOString().split("T")[0],min:new Date(this.state.startDate).toISOString().split("T")[0],onChange:function(e){return t.setState({endDate:new Date(e.target.value)})},required:!0}),Object(s.jsx)("div",{className:"btns",children:Object(s.jsx)("input",{className:"submit-btn",type:"submit",value:e===n.EDIT?"Save":"Add"})})]})]})}}]),a}(o.Component),D=a(40),C=a.p+"static/media/star.bbf860dc.png",E=a.p+"static/media/delete.9321bd63.png",N=(a(133),function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).deleteVacation=Object(f.a)(v.a.mark((function t(){var e;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e=n.props.vacation.id,t.next=4,j.a.delete("http://localhost:3001/vacations/"+e);case 4:A.dispatch({type:y.DeleteVacation,payload:e}),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),alert(t.t0.response.data.error),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,7]])}))),n.onEditClicked=function(){var t=n.props.vacation;A.dispatch({type:y.GetVacationDetails,payload:t}),A.dispatch({type:y.EditingVacation})},n.onCardClicked=function(){if("ADMIN"!==sessionStorage.getItem("userType"))if("CUSTOMER"===sessionStorage.getItem("userType")){var t=n.props.vacation;t.isFollowed?n.unfollowVacation(t.id):n.followVacation(t.id)}else A.dispatch({type:y.ShowLoginModal,payload:!0}),A.dispatch({type:y.GuestTryToFollowVacation,payload:!0})},n.followVacation=function(){var t=Object(f.a)(v.a.mark((function t(e){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,j.a.post("http://localhost:3001/vacations/followed",{vacationId:e});case 3:n.updateUI(),t.next=10;break;case 6:t.prev=6,t.t0=t.catch(0),alert(t.t0.message),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}(),n.unfollowVacation=function(){var t=Object(f.a)(v.a.mark((function t(e){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,j.a.delete("http://localhost:3001/vacations/followed/"+e);case 3:n.updateUI(),t.next=10;break;case 6:t.prev=6,t.t0=t.catch(0),alert(t.t0.message),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}(),n.updateUI=function(){var t=Object(D.a)(A.getState().vacations);t.forEach((function(t){t.id===n.props.vacation.id&&(t.isFollowed?(t.isFollowed-=1,t.amountOfFollowers-=1):(t.isFollowed+=1,t.amountOfFollowers+=1))})),A.dispatch({type:y.GetVacationsList,payload:t})},n.state={displayModal:!1},n}return Object(d.a)(a,[{key:"render",value:function(){var t=this,e="ADMIN"===sessionStorage.getItem("userType"),a="CUSTOMER"===sessionStorage.getItem("userType"),n=sessionStorage.getItem("landing")?"":"landing",o=this.props.vacation.isFollowed?"followed":"",i=0!==this.props.vacation.amountOfFollowers?this.props.vacation.amountOfFollowers:"";return Object(s.jsxs)("div",{className:"vacations ".concat(o," ").concat(n),style:{backgroundImage:"url(".concat(this.props.vacation.imageUrl,")")},onClick:this.onCardClicked,children:[Object(s.jsx)("h1",{children:this.props.vacation.destination}),Object(s.jsxs)("h5",{children:[new Date(this.props.vacation.startDate).toISOString().split("T")[0]," - ",new Date(this.props.vacation.startDate).toISOString().split("T")[0]]}),Object(s.jsxs)("h2",{children:[this.props.vacation.price," $"]}),Object(s.jsx)("p",{className:"description",children:this.props.vacation.description}),e?Object(s.jsxs)("div",{children:[Object(s.jsx)(h.b,{to:"/admin/manageVacation",children:Object(s.jsx)("img",{className:"edit",src:"data:image/png;base64,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",alt:"edit",onClick:this.onEditClicked})}),Object(s.jsx)("img",{className:"delete",src:E,alt:"delete",onClick:function(){return t.setState({displayModal:!0})}})]}):Object(s.jsxs)("div",{children:[Object(s.jsx)("img",{className:"follow",src:C,alt:"follow"}),a&&Object(s.jsxs)("label",{children:[" ",Object(s.jsx)("br",{}),i]})]}),this.state.displayModal&&Object(s.jsx)(O,{msg:"Are you sure you want to delete this vacation?",type:"danger",onSubmit:function(){return t.setState({displayModal:!1})},onDelete:this.deleteVacation})]})}}]),a}(o.Component)),V=a.p+"static/media/chart.53a0537a.png",T=(a(134),function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).unsubscribeStore=void 0,n.validateAdminLoggedIn=function(){"ADMIN"!==sessionStorage.getItem("userType")?n.props.history.push("/home"):A.getState().loggedIn||sessionStorage.getItem("token")?(A.dispatch({type:y.Login}),j.a.defaults.headers.common.Authorization=sessionStorage.getItem("token")):n.props.history.push("/admin")},n.getVacationsFromServer=Object(f.a)(v.a.mark((function t(){var e,a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,j.a.get("http://localhost:3001/vacations");case 3:e=t.sent,a=e.data,A.dispatch({type:y.GetVacationsList,payload:a}),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),alert(t.t0.response.data.error),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,8]])}))),n.state={vacations:[]},n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var t=this;this.validateAdminLoggedIn(),this.unsubscribeStore=A.subscribe((function(){return t.setState({vacations:A.getState().vacations})})),0!==A.getState().vacations.length?this.setState({vacations:A.getState().vacations}):this.getVacationsFromServer()}},{key:"componentWillUnmount",value:function(){this.unsubscribeStore()}},{key:"render",value:function(){return Object(s.jsxs)("div",{className:"admin",children:[Object(s.jsx)(k,{page:"admin/manageVacation",displayText:"Add Vacation"}),Object(s.jsxs)(h.b,{to:"/admin/chart",children:[" ",Object(s.jsx)("img",{className:"chart",src:V,alt:"chart-icon"})," "]}),this.state.vacations.map((function(t){return Object(s.jsx)(N,{vacation:t},t.id)}))]})}}]),a}(o.Component)),L=a(101),F=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).validateAdminIsLoggedIn=function(){A.getState().loggedIn&&"ADMIN"===sessionStorage.getItem("userType")||n.props.history.push("/home")},n.getChartDataFromServer=Object(f.a)(v.a.mark((function t(){var e,a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,j.a.get("http://localhost:3001/vacations/chart");case 3:e=t.sent,a=e.data,n.setState({followedVacations:a}),n.setChartData(),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(0),alert(t.t0.message),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,9]])}))),n.setChartData=function(){var t=n.state.datasets;t[0].data=n.state.followedVacations.map((function(t){return t.amountOfFollowers}));var e=n.state.followedVacations.map((function(t){return"Vacation "+t.id}));n.setState({labels:e,datasets:t})},n.state={followedVacations:[],labels:[],datasets:[{label:"Followed Vacations",backgroundColor:"rgba(102, 51, 153, 0.5)",borderColor:"rgba(0, 0, 0, 0.5)",hoverBorderWidth:1,data:[]}]},n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.validateAdminIsLoggedIn(),this.getChartDataFromServer()}},{key:"render",value:function(){return Object(s.jsxs)("div",{className:"bar-chart",children:[Object(s.jsx)(k,{page:"admin",displayText:"Back Home"}),Object(s.jsx)("div",{className:"backdrop-form",children:Object(s.jsx)(L.Bar,{data:this.state,height:370,width:1e3,options:{title:{display:!0,text:"Followed Vacations",fontSize:30,fontFamily:"Baumans"},legend:{display:!1},scales:{xAxes:[{scaleLabel:{display:!0,labelString:"Vacation ID",fontSize:18,fontFamily:"Baumans"}}],yAxes:[{ticks:{beginAtZero:!0,stepSize:1},scaleLabel:{display:!0,labelString:"Amount Of Followers",fontSize:18,fontFamily:"Baumans"}}]}}})})]})}}]),a}(o.Component),B=(a(229),function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).logout=function(){sessionStorage.clear(),A.dispatch({type:y.Logout});var t=A.getState().socket;t&&t.disconnect(),sessionStorage.setItem("landing","done")},n.state={loggedIn:!1},n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var t=this;A.subscribe((function(){return t.setState({loggedIn:A.getState().loggedIn})}))}},{key:"render",value:function(){var t,e,a=sessionStorage.getItem("landing")?"":"landing";return this.state.loggedIn?(t=sessionStorage.getItem("userAlias"),e=Object(s.jsx)(h.b,{className:"log-in-out",to:"/home",onClick:this.logout,children:"Log out"})):(t="stranger",e=Object(s.jsx)("h6",{className:"log-in-out",onClick:function(){return A.dispatch({type:y.ShowLoginModal,payload:!0})},children:"Login / Register"})),Object(s.jsxs)("div",{className:"header",children:[Object(s.jsxs)("h6",{children:["Hello, ",t,"!"]}),e,a&&Object(s.jsx)("h1",{className:"welcome",children:"Welcome!"}),Object(s.jsx)("h1",{className:a,children:"Obser Vacation"})]})}}]),a}(o.Component)),J=function t(e,a,n,s,o){Object(l.a)(this,t),this.username=e,this.password=a,this.firstName=n,this.lastName=s,this.id=o},M=a(102),H=(a(259),function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).unsubscribeStore=void 0,n.checkIfLoggedInOnSession=function(){0===A.getState().vacations.length?(n.getAllVacations(),sessionStorage.getItem("token")&&(A.dispatch({type:y.Login}),j.a.defaults.headers.common.Authorization=sessionStorage.getItem("token"),n.connectToSocket(),n.getUsersFollowing())):n.setState({vacations:A.getState().vacations})},n.getAllVacations=Object(f.a)(v.a.mark((function t(){var e,a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,j.a.get("http://localhost:3001/vacations");case 3:e=t.sent,a=e.data,A.dispatch({type:y.GetVacationsList,payload:a}),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),alert(t.t0.message),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,8]])}))),n.getUsersFollowing=Object(f.a)(v.a.mark((function t(){var e,a,s,o;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,j.a.get("http://localhost:3001/vacations/followed");case 3:e=t.sent,a=e.data,s=[],a.map((function(t){return s.push(t.vacationId)})),(o=Object(D.a)(n.state.vacations)).map((function(t){return s.includes(t.id)&&(t.isFollowed=1)})),A.dispatch({type:y.GetVacationsList,payload:o}),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(0),alert(t.t0.message),console.log(t.t0);case 16:case"end":return t.stop()}}),t,null,[[0,12]])}))),n.register=function(){var t=Object(f.a)(v.a.mark((function t(e){var a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,a=new J(n.state.username,n.state.password,n.state.firstName,n.state.lastName),t.next=5,j.a.post("http://localhost:3001/users",a);case 5:n.login(e),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),alert(t.t0.response.data.error),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}(),n.login=function(){var t=Object(f.a)(v.a.mark((function t(e){var a,s,o,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,a=new J(n.state.username,n.state.password),t.next=5,j.a.post("http://localhost:3001/users/login",a);case 5:s=t.sent,o=s.data,i=j.a.defaults.headers.common.Authorization="Bearer "+o.token,sessionStorage.setItem("token",i),n.closeLoginModal(),A.dispatch({type:y.Login}),n.handleUserType(o.userType),n.connectToSocket(),sessionStorage.setItem("landing","done"),t.next=20;break;case 16:t.prev=16,t.t0=t.catch(1),alert(t.t0.response.data.error),console.log(t.t0);case 20:case"end":return t.stop()}}),t,null,[[1,16]])})));return function(e){return t.apply(this,arguments)}}(),n.handleUserType=function(t){sessionStorage.setItem("userType",t),"ADMIN"===t?(sessionStorage.setItem("userAlias","admin"),n.props.history.push("/admin")):(sessionStorage.setItem("userAlias",n.state.username),n.getUsersFollowing())},n.closeLoginModal=function(){n.state.onRegisterMode&&n.setState({onRegisterMode:!1}),A.getState().guestTryToFollow&&A.dispatch({type:y.GuestTryToFollowVacation,payload:!1}),A.dispatch({type:y.ShowLoginModal,payload:!1}),sessionStorage.setItem("landing","done")},n.connectToSocket=function(){var t=Object(M.io)("http://localhost:3002/",{query:"token="+sessionStorage.getItem("token")}).connect();A.dispatch({type:y.SetSocket,payload:t}),t.on("DELETE_VACATION",(function(t){A.dispatch({type:y.DeleteVacation,payload:t})})),t.on("ADD_VACATION",(function(t){A.dispatch({type:y.AddNewVacation,payload:t})})),t.on("EDIT_VACATION",(function(t){A.dispatch({type:y.EditVacation,payload:t})}))},n.state={vacations:[],onRegisterMode:!1,loggedIn:!1,showLoginModal:!0,username:"",password:"",firstName:"",lastName:""},n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var t=this;this.unsubscribeStore=A.subscribe((function(){return t.setState({vacations:A.getState().vacations,loggedIn:A.getState().loggedIn,showLoginModal:A.getState().showLoginModal})})),this.checkIfLoggedInOnSession()}},{key:"componentWillUnmount",value:function(){this.unsubscribeStore()}},{key:"render",value:function(){var t=this,e=A.getState().loggedIn,a=A.getState().vacations,n=A.getState().showLoginModal,o=this.state.onRegisterMode,i=sessionStorage.getItem("landing")?"":"landing";return e?a.sort((function(t,e){return t.isFollowed===e.isFollowed?0:t.isFollowed?-1:1})):a.map((function(t){return t.isFollowed&&(t.isFollowed=0)})),Object(s.jsxs)("div",{className:"home",children:[e&&Object(s.jsx)(k,{page:"user/editProfile",displayText:"Edit Profile"}),a.map((function(t){return Object(s.jsx)(N,{vacation:t},t.id)})),!e&&n&&Object(s.jsx)("div",{className:"modal ".concat(i),children:Object(s.jsxs)("div",{className:"modal-content ".concat(i),children:[Object(s.jsxs)("div",{className:"modal-header",children:[Object(s.jsx)("span",{className:"close",onClick:this.closeLoginModal,children:" \xd7 "}),A.getState().guestTryToFollow&&Object(s.jsx)("h6",{className:"modal-warning",children:"Only members are able to follow vacations"}),Object(s.jsx)("h2",{children:o?"Register":"Login"})]}),Object(s.jsx)("div",{className:"modal-body",children:Object(s.jsxs)("form",{onSubmit:o?this.register:this.login,children:[Object(s.jsx)("span",{children:"*"}),Object(s.jsx)("input",{type:"text",placeholder:"Username",onChange:function(e){return t.setState({username:e.target.value})},required:!0}),Object(s.jsx)("span",{children:"*"}),Object(s.jsx)("input",{type:"password",placeholder:"Password",onChange:function(e){return t.setState({password:e.target.value})},required:!0}),o&&Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{type:"text",placeholder:"First Name",onChange:function(e){return t.setState({firstName:e.target.value})}}),Object(s.jsx)("input",{type:"text",placeholder:"Last Name",onChange:function(e){return t.setState({lastName:e.target.value})}})]}),Object(s.jsxs)("div",{className:"btns",children:[Object(s.jsx)("input",{className:"submit-btn",type:"submit",value:o?"Register":"Login"}),Object(s.jsx)("input",{className:"switch-mode-btn",type:"button",value:o?"Already a member?":"Not a member yet?",onClick:function(){return t.setState({onRegisterMode:!o})}})]})]})})]})})]})}}]),a}(o.Component)),P=(a(260),function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var s;return Object(l.a)(this,a),(s=e.call(this,t)).getUserDetails=Object(f.a)(v.a.mark((function t(){var e,a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,j.a.get("http://localhost:3001/users");case 3:e=t.sent,a=e.data[0],s.setState({username:a.username,firstName:a.firstName,lastName:a.lastName}),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),alert(t.t0.message),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,8]])}))),s.editProfile=function(){var t=Object(f.a)(v.a.mark((function t(e){var a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,a=new J(s.state.username,s.state.validatePassword,s.state.firstName,s.state.lastName),t.next=5,j.a.put("http://localhost:3001/users/",a);case 5:s.setState({successModalMode:n.SAVED}),s.handleSuccessModal(),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(1),alert(t.t0.response.data.error),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}(),s.handleSuccessModal=function(){s.setState({displayModal:!0,modalType:"success"}),setTimeout((function(){s.setState({displayModal:!1}),s.props.history.push("/home")}),2e3)},s.deleteAccount=function(){var t=Object(f.a)(v.a.mark((function t(e){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,t.next=4,j.a.delete("http://localhost:3001/users");case 4:s.setState({displayModal:!1,successModalMode:n.DELETED}),s.handleSuccessModal(),s.logout(),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(1),alert(t.t0.response.data.error),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}(),s.logout=function(){sessionStorage.clear(),sessionStorage.setItem("landing","done"),A.dispatch({type:y.Logout}),A.getState().socket.disconnect()},s.state={username:"",firstName:"",lastName:"",validatePassword:"",displayModal:!1,modalType:"",successModalMode:null},s}return Object(d.a)(a,[{key:"componentDidMount",value:function(){A.getState().loggedIn?this.getUserDetails():this.props.history.push("/home")}},{key:"render",value:function(){var t=this,e=this.state.successModalMode===n.SAVED?"Details changed successfully!":"Account deleted.";return Object(s.jsxs)("div",{className:"edit-profile",children:[Object(s.jsx)(k,{page:"home",displayText:"Back Home"}),this.state.displayModal&&Object(s.jsx)(O,{msg:"success"===this.state.modalType?e:"Are you sure you want to delete your account?",type:this.state.modalType,onSubmit:function(){return t.setState({displayModal:!1})},onDelete:this.deleteAccount}),Object(s.jsxs)("form",{onSubmit:this.editProfile,className:"backdrop-form",children:[Object(s.jsx)("h2",{children:"Edit Profile"}),Object(s.jsx)("input",{className:"disabled",type:"text",placeholder:"Username",defaultValue:this.state.username,onClick:function(){return alert("Username is not changeable")}}),Object(s.jsx)("input",{autoFocus:!0,type:"text",placeholder:"First Name",defaultValue:this.state.firstName,onChange:function(e){return t.setState({firstName:e.target.value})}}),Object(s.jsx)("input",{type:"text",placeholder:"Last Name",defaultValue:this.state.lastName,onChange:function(e){return t.setState({lastName:e.target.value})}}),Object(s.jsx)("br",{}),Object(s.jsx)("label",{children:" Insert your current password to apply changes "}),Object(s.jsx)("input",{type:"password",placeholder:"Current Password",onChange:function(e){return t.setState({validatePassword:e.target.value})}}),Object(s.jsxs)("div",{className:"btns",children:[Object(s.jsx)("input",{className:"submit-btn",type:"submit",value:"Save Changes"}),Object(s.jsx)("input",{className:"delete-btn",type:"button",value:"Delete Account",onClick:function(){return t.setState({displayModal:!0,modalType:"danger"})}})]})]})]})}}]),a}(o.Component)),U=(a(261),function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(){return Object(l.a)(this,a),e.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return Object(s.jsx)("div",{className:"layout",children:Object(s.jsxs)(h.a,{children:[Object(s.jsx)("header",{children:Object(s.jsx)(B,{})}),Object(s.jsx)("main",{children:Object(s.jsxs)(g.d,{children:[Object(s.jsx)(g.b,{path:"/home",component:H,exact:!0}),Object(s.jsx)(g.b,{path:"/admin",component:T,exact:!0}),Object(s.jsx)(g.b,{path:"/admin/chart",component:F,exact:!0}),Object(s.jsx)(g.b,{path:"/admin/manageVacation",component:I,exact:!0}),Object(s.jsx)(g.b,{path:"/user/editProfile",component:P,exact:!0}),Object(s.jsx)(g.a,{from:"/",to:"/home",exact:!0})]})})]})})}}]),a}(o.Component)),G=(a(262),function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,264)).then((function(e){var a=e.getCLS,n=e.getFID,s=e.getFCP,o=e.getLCP,i=e.getTTFB;a(t),n(t),s(t),o(t),i(t)}))});r.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(U,{})}),document.getElementById("root")),G()}},[[263,1,2]]]);
//# sourceMappingURL=main.2a5b5c73.chunk.js.map