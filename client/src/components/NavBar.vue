<template>
  <nav class="nav has-shadow" id="top">
        <div class="container" id="top2">
            <div class="nav">
                <a class="nav-item" href="/">
                    <img id="logo" src="/static/images/logo.png" alt="Description">
                </a>
            </div>
            <div v-if="data" class="nav" id="formNav">
                <div class="nav-item field" id="formNav1">
                    <div class="control has-icons-left" id="formNav2">

                        <b-field>
                            <b-autocomplete
                                v-model="name"
                                placeholder="Find a stock"
                                :data="filteredDataObj"
                                field="longName"
                                @select="onSelect($event)"
                            >
                            </b-autocomplete>
                        </b-field>

                        <span id="loupe" class="icon is-small is-left">
                          <i id="quicksearch" type="submit"  class="fa fa-search" ></i>
                        </span>
                    </div>
                </div>
            </div>
            <label class="nav-toggle" for="nav-toggle-state">
                <span></span>
                <span></span>
                <span></span>
            </label>

             <!-- This checkbox is hidden -->
             <input type="checkbox" id="nav-toggle-state" />

            <div class="nav-right nav-menu">
                <div id="menu">
                 <router-link v-for="(link, index) in navbarLinks" :key="index" :to="link.location"
                    :class="{'is-active': $route.path === link.location, 'nav-item': true, 'is-tab': true }"> {{ link.text }}
                </router-link>
                </div>
                <span class="nav-item">
                 <router-link v-if="!$root.user" to="/login" class="button ">Login</router-link>
                 <router-link v-if="!$root.user" to="/signup" class="button">Signup</router-link>
                </span>
                <div class="nav-profile" v-if="$root.user">
                    <router-link to="/mydashboard" >
                        <div class="image is-32x32 is-circle">
                        <img class ="imgProfile" v-if="connectedUser" :src="connectedUser.picProfile" alt="">
                        </div>
                    </router-link>
                    <div class="nav-user-profile">
                        <div id="nav-username" class="nav-user-name">@{{$root.user.username}}</div>
                        <div class="nav-status">
                            <a class="navbar-item" @click.prevent="logout" v-if="$root.user">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { getAllStocks, getUser } from "@/api/api";
import { logout } from "@/api/auth";

export default {
  name: "NavBar",
  data() {
    return {
      navbarLinks: [
        { location: "/stream", text: "Stream" },
        { location: "/trending", text: "Trending" },
        { location: "/mydashboard", text: "My Dashboard" }
      ],
      connectedUser:null,
      data: null,
      name: "",
      selected: null
    };
  },
  methods: {
    logout() {
      logout(this.$root);
      this.$router.push("/");
    },
    onSelect(stock) {
        if(stock) {
            this.selected = stock
            this.$router.push('/stocks/' + stock.longName.toLowerCase())
        }
    }
  },
  watch: {
      name(name) {
          // CRACRA, PLEASE FIX BUEFY AUTOCOMPLETE
          if(this.selected && name === this.selected.longName) {
              this.name = ""
              this.selected = null
          }
      }
  },
  computed: {
    filteredDataObj() {
      if (this.data) {
        return this.data
          .filter(stock => {
            return (
              stock.longName
                .toString()
                .toUpperCase()
                .indexOf(this.name.toUpperCase()) === 0
            );
          })
          .sort();
      }
      return [];
    }
  },

  mounted() {
    getAllStocks().then(data => {
      this.data = data;
    });
    getUser().then(data => {
      this.connectedUser = data;
    });
  }
};
</script>

<style scoped>

#nav-toggle-state {
  display: none;
}

#nav-toggle-state:checked ~ .nav-menu {
  display: flex;
}
/*nav profile*****************************************/

.image.is-32x32 {
    height: 45px;
    width: 45px;
}

.nav-profile {
    display: flex;
    align-items: center;
    display: flex;
    justify-content: flex-end;
}
.nav-photo-profil{
    width:12%;
}

.nav-right {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end!important;
}

.nav-user-name {
    font-size: 1rem;
}
.nav-item img {
    max-height: 2.75rem;
}


/*****************************************************/

.nav {
    height: 4.5rem;
}

.section.main {
    background-color: #f9f9f9;
    padding-top: 100px;
}

.hamburger,
.nav-toggle {
    cursor: pointer;
    display: block;
    height: 50px;
    position: relative;
    width: 50px;
}

#top {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
}

#top2 {
    display: flex;
    justify-content: space-between;
}


@media screen and (max-width: 768px) {
    #top {
        position: static;
    }
}
.nav-item .button+.button {
    margin-left: 10px;
}
#logo {
    max-height: 3rem;
}
.nav-item a:not(.button).is-tab.is-active,
a.nav-item:not(.button).is-tab.is-active {
    border-bottom: 3px solid #192b41;
    color: #192b41;
}
.nav-item a:not(.button).is-tab:hover,
a.nav-item:not(.button).is-tab:hover {
    border-bottom-color: #192b41;
    border-top-color: transparent;
}
.button.is-hovered,
.button:hover {
    background-color: #21ce99;
    border-color: transparent;
    color: #fff;
}

.button:focus:not(:active) {
    -webkit-box-shadow: 0 0 0 0.125em #192b41;
    box-shadow: 0 0 0 0.125em #192b41;
}

.button.is-focused,
.button:focus {
    border-color: #192b41;
    color: #363636;
}
#menu {
    display: flex;
    padding-right: 5%;
}
#formNav {
    min-width: 25%!important;
    margin-left: 12%;
}
#formNav1 {
    width: 100%;
}
#formNav2 {
    width: 100%;
}
.button:focus:not(:active),
.button.is-active,
.button:active,
.button.is-focused,
.button:focus,
.input.is-active,
.input.is-focused,
.input:active,
.input:focus,
.textarea.is-active,
.textarea.is-focused,
.textarea:active,
.textarea:focus {
    box-shadow: 0 0 0 0.125em rgb(25, 43, 65);
    border-color: #192b41;
}
@media screen and (min-width: 769px) {
    .nav-toggle {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .nav-toggle {
        padding-top: 75px;
    }
    #formNav {
    min-width: 25%!important;
    margin-left:-3%
    }
}

.field{
    margin-bottom: 0px;
}

</style>
