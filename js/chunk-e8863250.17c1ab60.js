(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e8863250"],{4048:function(e,t,s){"use strict";s("eed0")},a55b:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"grid",attrs:{id:"LoginMain"}},[s("vs-row",{staticClass:"flex-Center h-100",attrs:{align:"center",justify:"center"}},[s("vs-col",{staticClass:"form",attrs:{w:"6","vs-type":"flex",justify:"center",align:"center"}},[s("h2",{staticClass:"not-margin"},[e._v(" Welcome to "),s("b",[e._v("College Voyage")])]),s("div",{staticClass:"con-form"},[s("vs-input",{staticClass:"inputMargin",attrs:{placeholder:"Name"},scopedSlots:e._u([{key:"icon",fn:function(){return[e._v(" 🧑🏻‍🦱 ")]},proxy:!0}]),model:{value:e.displayName,callback:function(t){e.displayName=t},expression:"displayName"}}),s("vs-input",{staticClass:"inputMargin",attrs:{placeholder:"Email"},scopedSlots:e._u([{key:"icon",fn:function(){return[e._v(" @ ")]},proxy:!0}]),model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),s("vs-input",{staticClass:"inputMargin",attrs:{type:"password",placeholder:"Password"},scopedSlots:e._u([{key:"icon",fn:function(){return[e._v(" 🔒 ")]},proxy:!0}]),model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),s("vs-row",[s("vs-col",{staticClass:"buttonWrapper",attrs:{w:"8"}},[s("vs-button",{staticClass:"buttonMargin",attrs:{block:""},on:{click:e.emailLogin}},[e._v(" Sign In ")])],1),s("vs-col",{staticClass:"buttonWrapper",attrs:{w:"4"}},[s("vs-button",{staticClass:"buttonMargin",attrs:{block:""},on:{click:e.googles}},[e._v(" Google Sign in ")])],1)],1)],1)],1)],1)},n=[],i=(s("96cf"),s("1da1")),o=s("260b"),r=s("bec0"),c={data:function(){return{email:"sgkul2000@gmail.com",password:"helloworld",displayName:"Shreesh Kulkarni"}},methods:{emailLogin:function(){var e=this;r["a"].auth.createUserWithEmailAndPassword(this.email,this.password).then(function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(s){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["a"].db.doc("users/"+s.user.uid).set({displayName:e.displayName,email:e.email,id:s.user.uid,completed:!1,completedTime:null,progress:0});case 2:e.userLoggedIn(s.user.uid);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){console.log(t),"The email address is already in use by another account."===t.message&&r["a"].auth.signInWithEmailAndPassword(e.email,e.password).then((function(t){e.userLoggedIn(t.user.uid)})).catch((function(e){console.error(e)}))}))},googles:function(){var e=this,t=new o["a"].auth.GoogleAuthProvider;r["a"].auth.signInWithPopup(t).then((function(t){r["a"].db.collection("users").doc(t.user.uid).set({displayName:t.user.displayName,email:t.user.email,id:t.user.uid,completed:!1,completedTime:null,progress:0}).then((function(){e.userLoggedIn(t.user.uid)})).catch((function(e){console.error(e)}))})).catch((function(e){console.error(e)}))},userLoggedIn:function(e){this.$store.dispatch("FETCH_USER",e),this.$router.push({name:"Home"})}}},l=c,u=(s("d6db"),s("4048"),s("2877")),d=Object(u["a"])(l,a,n,!1,null,"54a32d4e",null);t["default"]=d.exports},d6db:function(e,t,s){"use strict";s("e67a")},e67a:function(e,t,s){},eed0:function(e,t,s){}}]);
//# sourceMappingURL=chunk-e8863250.17c1ab60.js.map