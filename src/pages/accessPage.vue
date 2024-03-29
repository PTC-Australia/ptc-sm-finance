<template>
  <q-page padding>
    <q-tabs v-model="tabs">
      <q-tab name="invites" label="Invite" />
      <q-tab name="admins" label="Admins" />
      <q-tab name="contributors" label="Contributors" />
    </q-tabs>
    <q-card v-show="$q.platform.is.mobile && tabs === 'invites'">
      <q-card-section>
        <div class="text-subtitle2">
          Invite People
          <q-icon
            name="help_outline"
            style="cursor: pointer"
            size="xs"
            color="grey-7"
          >
            <q-menu max-width="370px" anchor="center right" self="center left">
              <q-list separator class="q-px-sm">
                <q-item>
                  <q-item-section>
                    <q-item-label header class="text-bold"
                      >Invite People</q-item-label
                    >
                    <q-item-label caption>
                      Invite people to access the Project. There are two levels
                      of permissions available.<br />
                      <br />
                      A good priniciple when considering the level of access to
                      grant is to only provide the minimum level of access
                      required to the minimum amount of people who need it.
                      Avoid giving Admin access to anyone who isn't a Finance
                      Officer, Project Director, or Summer Missions National.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-expansion-item expand-separator label="Admins">
                  <q-card>
                    <q-card-section>
                      Admins have access to view, edit, and delete all elements
                      of the Project.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item expand-separator label="Contributors">
                  <q-card>
                    <q-card-section>
                      Contributors can only see the Transactions that they have
                      submitted and submit Transactions for the Budgets that
                      they have been given access to.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>
        <q-form @submit="addUser">
          <q-input
            v-model="newInvitation.email"
            type="email"
            label="Email"
            stack-label
          />
          <q-select
            v-if="isAdmin"
            v-model="newInvitation.permission"
            placeholder="Permission"
            :options="['contributor', 'admin']"
            label="Permission"
            stack-label
            style="min-width: 100px"
          />
          <q-select
            v-if="isAdmin && newInvitation.permission === 'contributor'"
            model-value=""
            @update:model-value="addNewInviteBudget"
            :options="budgetOptionsFiltered"
            label="Budgets"
            stack-label
            style="min-width: 100px"
            use-input
            @filter="budgetsFilterFn"
            input-debounce="0"
          />
          <div v-if="newInvitation.permission === 'contributor'">
            Accessible Budgets
          </div>
          <div
            v-if="newInvitation.permission === 'contributor'"
            class="q-gutter-xs"
          >
            <q-chip
              color="primary"
              text-color="white"
              dense
              square
              v-for="budget in newInvitation.budgets"
              :key="'budget-' + budget"
              removable
              @remove="removeNewInviteBudget(budget)"
            >
              {{
                budgets[budget]
                  ? budgets[budget].label
                  : budgetCategories[budget]
                  ? budgetCategories[budget].label
                  : accounts[budget].label
              }}
            </q-chip>
          </div>
          <q-btn
            dense
            title="Send Invitation"
            icon="send"
            color="positive"
            type="submit"
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>
    <q-card
      v-show="!$q.platform.is.mobile && tabs === 'invites'"
      class="mobile-hide"
    >
      <q-card-section>
        <div class="text-subtitle2">
          Invite People
          <q-icon
            name="help_outline"
            style="cursor: pointer"
            size="xs"
            color="grey-7"
          >
            <q-menu max-width="370px" anchor="center right" self="center left">
              <q-list separator class="q-px-sm">
                <q-item>
                  <q-item-section>
                    <q-item-label header class="text-bold"
                      >Invite People</q-item-label
                    >
                    <q-item-label caption>
                      Invite people to access the Project. There are two levels
                      of permissions available.<br />
                      <br />
                      A good priniciple when considering the level of access to
                      grant is to only provide the minimum level of access
                      required to the minimum amount of people who need it.
                      Avoid giving Admin access to anyone who isn't a Finance
                      Officer, Project Director, or Summer Missions National.
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-expansion-item expand-separator label="Admins">
                  <q-card>
                    <q-card-section>
                      Admins have access to view, edit, and delete all elements
                      of the Project.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item expand-separator label="Contributors">
                  <q-card>
                    <q-card-section>
                      Contributors can only see the Transactions that they have
                      submitted and submit Transactions for the Budgets that
                      they have been given access to.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>
        <q-input
          v-model="newInvitation.email"
          type="email"
          label="Email"
          stack-label
        >
          <template v-slot:append>
            <q-select
              v-if="isAdmin"
              v-model="newInvitation.permission"
              placeholder="Permission"
              :options="['contributor', 'admin']"
              label="Permission"
              stack-label
              style="min-width: 100px"
            />
            <q-select
              stack-label
              v-if="isAdmin && newInvitation.permission === 'contributor'"
              :options="budgetOptionsFiltered"
              label="Budgets"
              style="min-width: 100px; max-width: 150px"
              v-model="newInvitation.budgets"
              :display-value="`${
                (budgetOptions &&
                  newInvitation.budget &&
                  budgetOptions.find((val) => val.id === newInvitation.budget)
                    .label) ||
                ''
              }`"
              emit-value
              map-options
              multiple
              use-chips
              option-value="id"
              options-dense
              color="primary"
              hide-bottom-space
              borderless
              hide-selected
              use-input
              @filter="budgetsFilterFn"
              input-debounce="0"
            />
          </template>
          <template v-slot:after>
            <q-btn
              dense
              title="Send Invitation"
              icon="send"
              color="positive"
              @click="addUser"
            />
          </template>
        </q-input>
        <div
          v-if="
            newInvitation.budgets.length > 0 &&
            newInvitation.permission === 'contributor'
          "
        >
          Accessible Budgets
        </div>
        <div class="q-gutter-xs">
          <q-chip
            color="primary"
            text-color="white"
            dense
            square
            v-for="budget in newInvitation.budgets"
            :key="'budget-' + budget"
            removable
            @remove="removeNewInviteBudget(budget)"
          >
            {{
              budgets[budget]
                ? budgets[budget].label
                : budgetCategories[budget]
                ? budgetCategories[budget].label
                : accounts[budget].label
            }}
          </q-chip>
        </div>
      </q-card-section>
    </q-card>
    <q-table
      v-if="tabs === 'invites'"
      class="my-sticky-header-table q-mt-md"
      :rows="invites"
      :columns="invitesColumns"
      :rows-per-page-options="[5, 6, 7, 8, 9, 10, 15, 20, 50, 100]"
      row-key="name"
      :key="'invites'"
      :filter="invitesFilter"
      rows-per-page-label="Users per page:"
      :pagination="invitesPagination"
      dense
      @update:pagination="
        ($event) => {
          invitesPagination = $event
          $q.localStorage.set('invitesPagination', $event)
        }
      "
    >
      <template v-slot:top="props">
        <div class="col-4 q-table__title">
          Invites
          <q-icon
            name="help_outline"
            style="cursor: pointer"
            size="xs"
            color="grey-7"
          >
            <q-menu max-width="370px" anchor="center right" self="center left">
              <q-list separator class="q-px-sm">
                <q-item>
                  <q-item-section>
                    <q-item-label header class="text-bold"
                      >Invites</q-item-label
                    >
                    <q-item-label caption>
                      The following members have been given access to the
                      project but have not currently logged in to accept the
                      invitiation. To accept the invite, get the user to log in
                      with the email listed below.
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>

        <q-space />

        <q-input
          borderless
          dense
          debounce="300"
          v-model="invitesFilter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" class="text-bold">
          <q-td key="name" :props="props" class="cursor-pointer">
            <q-avatar class="q-pr-md" size="md">
              <q-img
                :src="
                  props.row.photoURL
                    ? props.row.photoURL
                    : 'https://avatars.dicebear.com/api/bottts/' +
                      props.row.uid +
                      '.svg'
                "
                alt="Profile Picture"
              >
                <template v-slot:error>
                  <q-img
                    :src="
                      'https://avatars.dicebear.com/api/bottts/' +
                      props.row.uid +
                      '.svg'
                    "
                    alt="Profile Picture"
                  >
                    <template v-slot:error>
                      <div
                        class="absolute-full flex flex-center bg-negative text-white"
                      >
                        Cannot load image
                      </div>
                    </template>
                  </q-img>
                </template>
              </q-img>
            </q-avatar>
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="permission" :props="props">
            {{ props.row.permission }}
          </q-td>
          <q-td
            key="budgets"
            :props="props"
            class="q-gutter-xs q-pa-xs"
            style="white-space: normal; max-width: 300px"
          >
            <q-select
              :options="budgetOptionsFiltered"
              dense
              style="min-width: 100px; max-width: 150px"
              @update:model-value="addInviteBudget($event, props.row.email)"
              :model-value="props.row.budgets"
              emit-value
              map-options
              multiple
              use-chips
              option-value="id"
              options-dense
              color="primary"
              use-input
              @filter="budgetsFilterFn"
              input-debounce="0"
            >
              <template v-slot:selected>
                <q-chip
                  v-for="budget in props.row.budgets"
                  :key="budget"
                  dense
                  square
                  text-color="white"
                  color="primary"
                  class="q-my-none q-ml-xs q-mr-none"
                  removable
                  @remove="
                    removeInviteBudget(
                      props.row.budgets,
                      budget,
                      props.row.email
                    )
                  "
                >
                  {{
                    `${
                      (budgetOptions &&
                        budget &&
                        budgetOptions.find((val) => val.id === budget).label) ||
                      ''
                    }`
                  }}
                </q-chip>
              </template>
            </q-select>
            <!-- <q-chip
              color="primary"
              text-color="white"
              dense
              square
              multiline
              v-for="budget in props.row.budgets"
              :key="'budget-' + budget"
              removable
              @remove="
                removeInviteBudget(props.row.budgets, budget, props.row.uid)
              "
            >
              {{
                budgets[budget]
                  ? budgets[budget].label
                  : budgetCategories[budget]
                  ? budgetCategories[budget].label
                  : accounts[budget].label
              }}
            </q-chip> -->
          </q-td>
          <q-td key="actions" :props="props" class="text-negative">
            <q-btn
              dense
              icon="delete"
              color="negative"
              @click="removeInvite(props.row.email)"
            />
            <!--  ${{ props.row.expenses }}
            <q-tooltip class="bg-accent text-black">
              Auto Calculated
            </q-tooltip> -->
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      v-if="tabs === 'admins'"
      class="my-sticky-header-table"
      :rows="admins"
      :columns="adminsColumns"
      :rows-per-page-options="[5, 6, 7, 8, 9, 10, 15, 20, 50, 100]"
      row-key="name"
      :key="'admins'"
      :filter="adminsFilter"
      rows-per-page-label="Users per page:"
      :pagination="adminsPagination"
      dense
      @update:pagination="
        ($event) => {
          adminsPagination = $event
          $q.localStorage.set('adminsPagination', $event)
        }
      "
    >
      <template v-slot:top="props">
        <div class="col-4 q-table__title">
          Admins
          <q-icon
            name="help_outline"
            style="cursor: pointer"
            size="xs"
            color="grey-7"
          >
            <q-menu max-width="370px" anchor="center right" self="center left">
              <q-list separator class="q-px-sm">
                <q-item>
                  <q-item-section>
                    <q-item-label header class="text-bold">Admins</q-item-label>
                    <q-item-label caption>
                      Admins are users who have access to view, edit, and delete
                      all elements of the Project.
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>

        <q-space />

        <q-input
          borderless
          dense
          debounce="300"
          v-model="adminsFilter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" class="text-bold">
          <q-td key="name" :props="props" class="cursor-pointer">
            <q-avatar class="q-pr-md" size="md">
              <q-img
                :src="
                  props.row.photoURL
                    ? props.row.photoURL
                    : 'https://avatars.dicebear.com/api/bottts/' +
                      props.row.uid +
                      '.svg'
                "
                alt="Profile Picture"
              >
                <template v-slot:error>
                  <q-img
                    :src="
                      'https://avatars.dicebear.com/api/bottts/' +
                      props.row.uid +
                      '.svg'
                    "
                    alt="Profile Picture"
                  >
                    <template v-slot:error>
                      <div
                        class="absolute-full flex flex-center bg-negative text-white"
                      >
                        Cannot load image
                      </div>
                    </template>
                  </q-img>
                </template>
              </q-img>
            </q-avatar>
            {{ props.row.name ? props.row.name : 'Anonymous' }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="actions" :props="props" class="text-negative">
            <q-btn
              dense
              icon="delete"
              color="negative"
              @click="removeUser(props.row.uid)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      v-if="tabs === 'contributors'"
      class="my-sticky-header-table"
      :rows="contributors"
      :columns="contributorsColumns"
      :rows-per-page-options="[5, 6, 7, 8, 9, 10, 15, 20, 50, 100]"
      row-key="name"
      :key="'contributors'"
      :filter="contributorsFilter"
      rows-per-page-label="Users per page:"
      :pagination="contributorsPagination"
      dense
      @update:pagination="
        ($event) => {
          contributorsPagination = $event
          $q.localStorage.set('contributorsPagination', $event)
        }
      "
    >
      <template v-slot:top="props">
        <div class="col-4 q-table__title">
          Contributors
          <q-icon
            name="help_outline"
            style="cursor: pointer"
            size="xs"
            color="grey-7"
          >
            <q-menu max-width="370px" anchor="center right" self="center left">
              <q-list separator class="q-px-sm">
                <q-item>
                  <q-item-section>
                    <q-item-label header class="text-bold"
                      >Contributors</q-item-label
                    >
                    <q-item-label caption>
                      Contributors are users who only have access to submit
                      Transactions to the specified Budgets only. They also have
                      access to see the Transactions that they have submitted.
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>

        <q-space />

        <q-input
          borderless
          dense
          debounce="300"
          v-model="contributorsFilter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" class="text-bold">
          <q-td key="name" :props="props" class="cursor-pointer">
            <q-avatar class="q-pr-md" size="md">
              <q-img
                :src="
                  props.row.photoURL
                    ? props.row.photoURL
                    : 'https://avatars.dicebear.com/api/bottts/' +
                      props.row.uid +
                      '.svg'
                "
                alt="Profile Picture"
              >
                <template v-slot:error>
                  <q-img
                    :src="
                      'https://avatars.dicebear.com/api/bottts/' +
                      props.row.uid +
                      '.svg'
                    "
                    alt="Profile Picture"
                  >
                    <template v-slot:error>
                      <div
                        class="absolute-full flex flex-center bg-negative text-white"
                      >
                        Cannot load image
                      </div>
                    </template>
                  </q-img>
                </template>
              </q-img>
            </q-avatar>
            {{ props.row.name ? props.row.name : 'Anonymous' }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td
            key="budgets"
            :props="props"
            class="q-gutter-xs q-pa-xs"
            style="white-space: normal; max-width: 300px"
          >
            <q-select
              :options="budgetOptionsFiltered"
              dense
              style="min-width: 100px; max-width: 150px"
              @update:model-value="addContributorBudget($event, props.row.uid)"
              :model-value="props.row.budgets"
              emit-value
              map-options
              multiple
              use-chips
              option-value="id"
              options-dense
              color="primary"
              use-input
              @filter="budgetsFilterFn"
              input-debounce="0"
            />
            <!-- <q-select
              :options="budgetOptions"
              dense
              style="min-width:100px;max-width:150px"
              @update:model-value="
                addContributorBudget(
                  props.row.budgets,
                  $event.id,
                  props.row.uid
                )
              "
              value=""
              hide-selected
            />
            <q-chip
              color="primary"
              text-color="white"
              dense
              square
              multiline
              v-for="budget in props.row.budgets"
              :key="'budget-' + budget"
              removable
              @remove="
                removeContributorBudget(
                  props.row.budgets,
                  budget,
                  props.row.uid
                )
              "
            >
              {{
                budgets[budget]
                  ? budgets[budget].label
                  : budgetCategories[budget]
                  ? budgetCategories[budget].label
                  : accounts[budget].label
              }}
            </q-chip> -->
          </q-td>
          <q-td key="actions" :props="props" class="text-negative">
            <q-btn
              dense
              icon="delete"
              color="negative"
              @click="removeUser(props.row.uid)"
            />
            <!--  ${{ props.row.expenses }}
            <q-tooltip class="bg-accent text-black">
              Auto Calculated
            </q-tooltip> -->
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <actionsStickyFAB />
    <div style="min-height: 60px" />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import {
  addContributorBudget,
  removeContributorBudget,
  updateInviteBudget,
  addUser,
  removeUser,
  removeInvite,
} from './../scripts/access.js'

const adminsColumns = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  {
    name: 'email',
    align: 'center',
    label: 'Email',
    field: 'email',
    sortable: true,
  },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions' },
]

const contributorsColumns = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  {
    name: 'email',
    align: 'center',
    label: 'Email',
    field: 'email',
    sortable: true,
  },
  {
    name: 'budgets',
    align: 'left',
    label: 'Budgets',
    field: 'budgets',
    sortable: true,
  },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions' },
]

const invitesColumns = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  {
    name: 'email',
    align: 'left',
    label: 'Email',
    field: 'email',
    sortable: true,
  },
  {
    name: 'permission',
    align: 'left',
    label: 'Permission',
    field: 'permission',
    sortable: true,
  },
  {
    name: 'budgets',
    align: 'left',
    label: 'Budgets',
    field: 'budgets',
    sortable: true,
  },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions' },
]

export default {
  data() {
    return {
      tabs: 'invites',
      right: false,
      share: false,
      newInvitation: {
        email: '',
        permission: 'contributor',
        accepted: false,
        sent: false,
        projectName: '',
        fromName: '',
        budgets: [],
      },
      // admins: []
      adminsColumns,
      adminsFilter: '',
      adminsPagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      // contributors: []
      contributorsColumns,
      contributorsFilter: '',
      contributorsPagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      // invites: []
      invitesColumns,
      invitesFilter: '',
      invitesPagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      budgetOptionsFiltered: [],
      fabPos: [18, 18],
      draggingFab: false,
    }
  },
  preFetch({ store, currentRoute }) {
    // store.dispatch('fetchBudgets', currentRoute.params.id)
    store.dispatch('auth/fetchContributors', currentRoute.params.id)
    store.dispatch('auth/fetchInvites', currentRoute.params.id)
  },
  created() {
    // console.log(this.$route.name)
    // this.$store.dispatch('fetchProject', { projectId: this.$route.params.id, uid: this.user.uid })
    // this.$store.dispatch('fetchTransactions', this.$route.params.id)
    // this.$store.dispatch('fetchBudgetCategories', this.$route.params.id)
    // this.$store.dispatch('fetchBudgets', this.$route.params.id)
    // this.$store.dispatch('fetchAccounts', this.$route.params.id)
    // this.$store.dispatch('fetchContributors', this.$route.params.id)
    // this.$store.dispatch('fetchInvites', this.$route.params.id)
    // console.log(this.$route.name)
    this.newInvitation.fromName = this.user.displayName
    this.newInvitation.projectName = this.project.name
    this.adminsPagination = this.$q.localStorage.has('adminsPagination')
      ? this.$q.localStorage.getItem('adminsPagination')
      : {
          sortBy: 'name',
          descending: false,
          page: 1,
          rowsPerPage: 10,
          // rowsNumber: xx if getting data from a server
        }
    this.contributorsPagination = this.$q.localStorage.has(
      'contributorsPagination'
    )
      ? this.$q.localStorage.getItem('contributorsPagination')
      : {
          sortBy: 'name',
          descending: false,
          page: 1,
          rowsPerPage: 10,
          // rowsNumber: xx if getting data from a server
        }
    this.invitesPagination = this.$q.localStorage.has('invitesPagination')
      ? this.$q.localStorage.getItem('invitesPagination')
      : {
          sortBy: 'name',
          descending: false,
          page: 1,
          rowsPerPage: 10,
          // rowsNumber: xx if getting data from a server
        }
  },
  computed: {
    ...mapGetters('projects', ['isAdmin', 'isContributor', 'project']),
    ...mapGetters('budgets', [
      'accounts',
      'budgets',
      'budgetCategories',
      'budgetOptions',
    ]),
    ...mapGetters('auth', [
      'admins',
      'contributors',
      'invites',
      'idToken',
      'user',
    ]),
  },
  methods: {
    addContributorBudget(tempBudgets, uid) {
      // console.log(this.newInvitation.budgets.indexOf(event.id) !== -1)
      // let tempBudgets = JSON.parse(JSON.stringify(budgets))
      // if (tempBudgets.indexOf(newBudget) === -1) {
      //   tempBudgets.push(newBudget)
      addContributorBudget(this.$route.params.id, tempBudgets, uid)
        .then(() => {
          // console.log('updated')
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Contributor Added Successfully',
          })
        })
        .catch((err) => {
          console.log(err)
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          })
        })
      // }
    },
    removeContributorBudget(budgets, newBudget, uid) {
      // var overrideStyleVal = this.overrideStyles[event].id
      // console.log(overrideStyleVal)
      let tempBudgets = JSON.parse(JSON.stringify(budgets))
      var index = tempBudgets.indexOf(newBudget)
      if (index > -1) {
        tempBudgets.splice(index, 1)
        removeContributorBudget(this.$route.params.id, tempBudgets, uid)
          .then(() => {
            // console.log('updated')
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Contributor Removed Successfully',
            })
          })
          .catch((err) => {
            console.log(err)
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              message: 'Oops, Something went wrong!',
            })
          })
      }
    },
    addInviteBudget(tempBudgets, email) {
      // console.log(this.newInvitation.budgets.indexOf(event.id) !== -1)
      // let tempBudgets = JSON.parse(JSON.stringify(budgets))
      // if (tempBudgets.indexOf(newBudget) === -1) {
      //   tempBudgets.push(newBudget)
      //   console.log(tempBudgets, email)
      updateInviteBudget(this.$route.params.id, tempBudgets, email)
        .then(() => {
          // console.log('updated')
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Contributor Budget Added Successfully',
          })
        })
        .catch((err) => {
          console.log(err)
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          })
        })
      // }
    },
    removeInviteBudget(budgets, newBudget, email) {
      // var overrideStyleVal = this.overrideStyles[event].id
      // console.log(overrideStyleVal)
      let tempBudgets = JSON.parse(JSON.stringify(budgets))
      var index = tempBudgets.indexOf(newBudget)
      if (index > -1) {
        tempBudgets.splice(index, 1)
        updateInviteBudget(this.$route.params.id, tempBudgets, email)
          .then(() => {
            // console.log('updated')
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Contributor Budget Removed Successfully',
            })
          })
          .catch((err) => {
            console.log(err)
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'error',
              message: 'Oops, Something went wrong!',
            })
          })
      }
    },
    addNewInviteBudget(event) {
      // console.log(this.newInvitation.budgets.indexOf(event.id) !== -1)
      if (this.newInvitation.budgets.indexOf(event.id) === -1) {
        this.newInvitation.budgets.push(event.id)
      }
    },
    removeNewInviteBudget(event) {
      // var overrideStyleVal = this.overrideStyles[event].id
      // console.log(overrideStyleVal)
      var index = this.newInvitation.budgets.indexOf(event)
      if (index > -1) {
        this.newInvitation.budgets.splice(index, 1)
      }
    },
    addUser(uid) {
      // console.log(`/projects/${this.$route.params.id}/invites/${this.newInvitation.email}`)
      for (var key in this.invites) {
        if (
          this.newInvitation.email.toLowerCase() ===
          this.invites[key].email.toLowerCase()
        ) {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Invite already sent',
          })
          return
        }
      }
      for (key in this.contributors) {
        if (
          this.newInvitation.email.toLowerCase() ===
          this.contributors[key].email.toLowerCase()
        ) {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'User already has access',
          })
          return
        }
      }

      // console.log(this.$route.params.id, this.newInvitation)
      addUser(this.$route.params.id, this.newInvitation)
        .then(() => {
          // console.log('updated')
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'User Added Successfully',
          })
        })
        .catch((err) => {
          console.log(err)
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          })
        })
    },
    removeUser(uid) {
      // console.log(`/projects/${this.$route.params.id}/contributors/${event}`)
      removeUser(this.$route.params.id, uid)
        .then(() => {
          // console.log('updated')
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'User Removed Successfully',
          })
        })
        .catch((err) => {
          console.log(err)
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          })
        })
    },
    removeInvite(email) {
      // console.log(`/projects/${this.$route.params.id}/contributors/${event}`)
      removeInvite(this.$route.params.id, email)
        .then(() => {
          // console.log('updated')
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Invite Removed Successfully',
          })
        })
        .catch((err) => {
          console.log(err)
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          })
        })
    },
    budgetsFilterFn(val, update) {
      if (val === '') {
        update(() => {
          this.budgetOptionsFiltered = this.budgetOptions.filter(
            (val) => val.id !== 'debitCard' && val.id !== 'pettyCash'
          )
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.budgetOptionsFiltered = this.budgetOptions
          .filter((val) => val.id !== 'debitCard' && val.id !== 'pettyCash')
          .filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
  },
  watch: {
    project(oldVal, newVal) {
      this.newInvitation.projectName = this.project.name
    },
    //   newInvitation (oldVal, newVal) {
    //     if (oldVal.permission !== newVal.permission) {
    //       if (this.newInvitation.permission === 'contributor') {
    //         this.newInvitation.budgets = []
    //       } else {
    //         this.newInvitation.budgets = ['all']
    //       }
    //     }
    //   }
  },
  components: {
    actionsStickyFAB: defineAsyncComponent(() =>
      import('./../components/actionsStickyFAB.vue')
    ),
  },
}
</script>

<!-- <style>
  .q-table tbody td {
    white-space: normal;
  }
</style>
 -->
