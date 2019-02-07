    // create a component first

    // each route gets mapped to a component that you define
    // and that component gets rendered in the <router-view> element

    import LoginComponent from '../js/modules/LoginComponent.js';
    import UsersComponent from '../js/modules/UsersComponent.js';

    const routes = [
        { path: '/', redirect: { name:"login"} },
        { path: '/login', name: 'login', component: LoginComponent },
        { path: '/users', name: 'users', component: UsersComponent }
    ]

    const router = new VueRouter({
        routes
    });

    // then your vue instance

    const vm = new Vue({

        data: {
            testmessage: "sup",

            authenticated: false,

            mockAccount: {
                username: "NMK",
                password: "password"
            }
        },

        methods: {
            calledOnParent() {
                console.log("this method lives in the main VM and was called from a component");
            },

            setAuthenticated(status) {
                this.authenticated = status;
            },

            logout() {
                this.authenticated = false;
            }
        },

        created: function() {
            console.log("this is the main vue instance");
        },

        router: router
 }).$mount("#app");

 router.beforeEach((to, from, next) => {
     console.log('router guard fired!');

     if (vm.authenticated == false) {
         next("/login");
     } else {
         next();
     }
});