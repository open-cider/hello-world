<script lang="ts">
import LogoText from '@/components/LogoText.vue';
import SummaryData from '@/components/SummaryData.vue';
import { fetchDetails } from '@/utils/client';
import type { User } from '@/utils/interfaces';


export default {
    components: { LogoText, SummaryData },
    mounted() {
        fetchDetails().then(user => {
            if (user.username == '') {
                this.$router.push('/auth')
            } else {
                this.document = user
            }
        }).catch(() => this.$router.push('/auth'))
    },
    methods: {
        openDocumentation() {
            window.open('https://www.opencider.com/documentation', '_blank')
        }
    },
    data() {
        return {
            document: {} as User
        }
    }
}
</script>

<template>
    <div class="container">
        <!--logo ...-->
        <LogoText />

        <!--Content...-->
        <div class="container row">
            <div class="column">
                <div class="column-top" />
                <h3 class="column-heading">Username - {{ document.username }}</h3>
                <h5 class="sub-heading">Email Address | {{ document.emailAddress }}</h5>
                <p>
                    Username, email, and avatar are retrieved on successful authentication - building blocks for any application. 
                    A unique ID is also provided (for use in your external databases for example). 
                    This identifier exists as long as the user is on your platform.
                </p>
                
                <div style="height: 40%;" />
                
                <button class="btn-outline" @click="openDocumentation">Read Documentation</button>
            </div>
            <div class="column">
                <div class="avatar">
                    <img class="pfp" :src="document.avatar" />
                </div>
            </div>
            <div class="column">
                <div class="column-top" />
                <h3 class="column-heading">Summary data | details</h3>
                <p>
                    Helps you store frequently accessed data about the user. 
                    In most cases, this would be top level information as shown below.
                </p>
                
                <SummaryData />
                
                <p>
                    <span>Note:</span> data store with the Summary Data API is also stored in <span>blockchain-like</span> fashion. 
                    This will be useful later in observing data trends
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
p { font-size: 0.8em; }

p span { color: var(--color-heading); }

.avatar {
    margin: auto;
    margin-top: 4em;
    text-align: center;
}

.btn-outline:hover { background: var(--color-primary); }
.btn-outline {
    text-transform: uppercase;
    background: var(--color-background);
    border: 2px solid var(--color-heading);
    color: var(--color-heading);
    padding: 8px 16px;
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
}

.column-heading {
    text-transform: uppercase;
    margin-bottom: 0.1em;
}

.column-top {
    margin-top: 7em;
}

.pfp {
  margin-top: 9em;
  width: 9em;
  height: 9em;
  border-radius: 50%;
}

.sub-heading {
    color: var(--color-heading);
    font-size: 12.3px;
}
</style>