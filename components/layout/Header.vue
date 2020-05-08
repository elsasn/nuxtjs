<template>
    <div>
        <div class="header__desktop d-lg-block d-none">
            <b-navbar class="py-0 navbar__top" toggleable="lg" type="light" variant="light">
                <div class="container-fluid">
                    <b-navbar-brand href="#" class="text-primary"><i class="fas fa-home"></i></b-navbar-brand>

                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item href="#" class="text-uppercase font-weight-bold">Company A</b-nav-item>
                            <b-nav-item-dropdown text="HOME" right>
                                <b-dropdown-item href="#">HOME</b-dropdown-item>
                            </b-nav-item-dropdown>
                        </b-navbar-nav>

                        <!-- Right aligned nav items -->
                        <b-navbar-nav class="ml-auto align-items-center">
                            <b-nav-item-dropdown text="Tony Stark" right>
                                <b-dropdown-item href="#">Edit profile</b-dropdown-item>
                                <b-dropdown-item href="#">xxxx</b-dropdown-item>
                                <b-dropdown-item href="#">Admin</b-dropdown-item>
                            </b-nav-item-dropdown>
                            <button class="btn btn-default ml-3">Logout</button>
                        </b-navbar-nav>
                    </b-collapse>
                </div>
            </b-navbar>
            <b-navbar class="navbar__bottom py-0" type="secondary" variant="secondary">
                <b-navbar-nav>
                    <nuxt-link tag="a" :to="{name: 'index'}" class="nav-link text-uppercase">Dashboard</nuxt-link>
                    <nuxt-link tag="a" :to="{name: 'template'}" class="nav-link text-uppercase">Template</nuxt-link>
                    <nuxt-link tag="a" :to="{name: 'notes_template-index-list'}" class="nav-link text-uppercase">Notes Temp</nuxt-link>
                    <nuxt-link tag="a" to="#" class="nav-link text-uppercase">Menu</nuxt-link>
                </b-navbar-nav>
            </b-navbar>
        </div>
        <div class="header__mobile d-lg-none">
            <b-navbar toggleable="lg" type="light" variant="light">
                <div class="container-fluid">
                    <b-navbar-brand href="#" class="text-primary"><i class="fas fa-home"></i></b-navbar-brand>
                    <b-navbar-nav class="mr-auto">
                        <b-nav-item href="#" class="text-uppercase font-weight-bold">Company A</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-toggle target="nav-collapse" @click="showHideMobile"></b-navbar-toggle>
                </div>
                <transition name="slide-right" mode="out-in">
                    <div class="mobile__menu p-3" v-if="isShowMobile">
                        <div class="d-flex align-items-start justify-content-between">
                            <b-dropdown id="dropdown-1" variant="default" text="Tony Stark" class="m-md-2">
                                <b-dropdown-item href="#">Edit profile</b-dropdown-item>
                                <b-dropdown-item href="#">xxxx</b-dropdown-item>
                                <b-dropdown-item href="#">Admin</b-dropdown-item>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item href="#">Logout</b-dropdown-item>
                            </b-dropdown>
                            <div class="mobile__menu--close">
                                <i class="fas fa-times fa-lg" @click="showHideMobile"></i>
                            </div>
                        </div>
                        <div class="d-flex flex-column mt-3">
                            <nuxt-link class="mobile__menu--item text-uppercase py-2" tag="a" to="/">User</nuxt-link>
                            <nuxt-link class="mobile__menu--item text-uppercase py-2" tag="a" to="#">Catatan medis gizi</nuxt-link>
                            <nuxt-link class="mobile__menu--item text-uppercase py-2" tag="a" to="#">Menu</nuxt-link>
                        </div>
                    </div>
                </transition>
            </b-navbar>
        </div>
    </div>
</template>

<script>
export default {
    data: () =>{
        return {
            isShowMobile : false
        }
    },
    methods: {
        showHideMobile() {
            this.isShowMobile = !this.isShowMobile
        }
    }
}
</script>

<style>

</style>