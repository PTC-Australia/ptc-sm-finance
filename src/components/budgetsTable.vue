<template>
    <q-table
    :flat="flat"
      class="my-sticky-header-table"
      :rows="budgetsFiltered"
      :columns="columns"
      title="Budget"
      :rows-per-page-options="[5, 6, 7, 8, 9, 10, 15, 20, 50, 100]"
      row-key="name"
      :filter="filter"
      rows-per-page-label="Budgets per page:"
      :pagination="pagination"
      @update:pagination="
        ($event) => {
          pagination = $event
          $q.localStorage.set('budgetPagination', $event)
        }
      "
      dense
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">
          Budgets
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
                      >Budgets</q-item-label
                    >
                    <q-item-label caption>
                      Budgets are a sub category within a Category. They must be
                      linked to a Category. They are used to break your Budget
                      into smaller more managable parts to help you keep track
                      of the money within your Project.
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>

        <q-space />

        <!-- <div v-if="$q.screen.gt.xs" class="col">
          <q-toggle v-for="column in columns" v-model="visibleColumns" :val="column.name" :label="column.label" :key="column.name" />
        </div>
 -->
        <!-- <q-select
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
        /> -->

        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <sp-budget-import dense />

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
          <q-td key="category" :props="props" class="cursor-pointer">
            <!-- {{ props.row.category }} -->
            <!-- {{budgetCategories}}{{props.row.id}} -->
            {{
              budgetCategories[props.row.category]
                ? budgetCategories[props.row.category].label
                : ''
            }}
            <q-popup-edit v-model="props.row.category">
              <q-select
                :model-value="
                  props.row.category > ''
                    ? budgets[props.row.category]
                      ? budgets[props.row.category].label
                      : budgetCategories[props.row.category]
                      ? budgetCategories[props.row.category].label
                      : ''
                    : ''
                "
                @update:model-value="
                  updateBudget(props.row.id, 'category', $event.id)
                "
                dense
                autofocus
                label="Budget Category"
                :options="budgetCategoryOptions"
              />
            </q-popup-edit>
            <q-tooltip
              anchor="center right"
              self="center left"
              class="bg-accent text-black"
            >
              <q-icon name="edit" />
              Edit
            </q-tooltip>
            <q-badge
              v-if="props.row.transAwaitingReview > 0"
              class="bg-red-8"
              :label="
                props.row.transAwaitingReview
                  ? props.row.transAwaitingReview
                  : ''
              "
              floating
            />
          </q-td>
          <q-td key="label" :props="props" class="cursor-pointer" auto-width>
            {{ props.row.label }}
            <q-popup-edit v-model="props.row.label">
              <q-input
                :model-value="props.row.label > '' ? props.row.label : ''"
                @update:model-value="
                  updateBudget(props.row.id, 'label', $event)
                "
                dense
                autofocus
                label="Budget Label"
              />
            </q-popup-edit>
            <q-tooltip
              anchor="center right"
              self="center left"
              class="bg-accent text-black"
            >
              <q-icon name="edit" />
              Edit
            </q-tooltip>
          </q-td>
          <q-td key="budgeted" :props="props" class="cursor-pointer">
            {{ props.row.budget.format() }}
            <q-popup-edit v-model="props.row.budget">
              <!-- <q-input v-model="props.row.budget" dense autofocus label="Budgeted Amount"> -->
              <q-input
                :model-value="props.row.budget > '' ? props.row.budget.value : ''"
                @update:model-value="
                  updateBudget(props.row.id, 'budget', currency($event).value)
                "
                dense
                autofocus
                label="Budgeted Amount"
              >
                <template v-slot:prepend> $ </template>
              </q-input>
            </q-popup-edit>
            <q-tooltip
              anchor="center right"
              self="center left"
              class="bg-accent text-black"
            >
              <q-icon name="edit" />
              Edit
            </q-tooltip>
          </q-td>
          <q-td
            key="spent"
            :props="props"
            :class="{
              'text-negative':
                props.row.budget.subtract(props.row.expenses).value <
                0,
            }"
          >
            {{ props.row.expenses.format() }}
          </q-td>
          <q-td key="remaining" :props="props">
            <q-badge
              :class="{
                'bg-green-8':
                  (props.row.balance ? props.row.balance.value : 0) > 0.01,
                'bg-red-8': (props.row.balance ? props.row.balance.value : 0) < -0.01,
                'bg-black':
                  (props.row.balance ? props.row.balance.value : 0) < 0.01 &&
                  (props.row.balance ? props.row.balance.value : 0) > -0.01,
              }"
              :label="
                (props.row.balance ? props.row.balance : currency(0)).format()
              "
            />
          </q-td>
          <!-- <q-td key="awaitingReviews" :props="props">
            <q-badge
              v-if="props.row.transAwaitingReview > 0"
              class="bg-red-8"
              :label="
                props.row.transAwaitingReview
                  ? props.row.transAwaitingReview
                  : ''
              "
            />
          </q-td> -->
          <q-td key="buttons" :props="props">
            <q-btn
              :to="{
                name: 'transactions',
                params: { budgetCategory: props.row.id },
              }"
              dense
              class="q-mr-sm"
            >
              Transactions
              <q-tooltip class="bg-accent text-black">
                View this Budgets Transactions
              </q-tooltip>
            </q-btn>
            <q-btn v-if="props.row.inUse" dense color="negative">
              <q-icon name="delete_forever" />
              <q-tooltip class="bg-accent text-black">
                Cannot Delete Budget while in use
              </q-tooltip>
            </q-btn>
            <sp-delete-btn
              dense
              v-if="!props.row.inUse"
              :docRef="`/projects/${project.id}/accounts/${props.row.id}`"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { debounce } from 'quasar'
import { updateBudgetByKey } from '../scripts/accounts.js'
import { defineAsyncComponent } from 'vue'
import currency from 'currency.js'

const columns = [
  {
    name: 'category',
    align: 'left',
    label: 'Category',
    field: 'category',
    sortable: true,
  },
  {
    name: 'label',
    align: 'left',
    label: 'Label',
    field: 'label',
    sortable: true,
  },
  {
    name: 'budgeted',
    align: 'center',
    label: 'Budgeted (AUD)',
    field: 'budgeted',
    sortable: true,
  },
  {
    name: 'spent',
    align: 'center',
    label: 'Spent (AUD)',
    field: 'spent',
    sortable: true,
  },
  {
    name: 'remaining',
    align: 'center',
    label: 'Cash in Hand (AUD)',
    field: 'remaining',
    sortable: true,
  },
  // {
  //   name: 'awaitingReviews',
  //   align: 'center',
  //   label: 'Transactions Awaiting Review',
  //   field: 'awaitingReviews',
  //   sortable: true
  // },
  { name: 'buttons', label: 'Actions', field: 'buttons', align: 'right' },
]

export default {
  props: {
    flat: Boolean
  },
  data() {
    return {
      // data,
      columns,
      filter: '',
      visibleColumns: [
        'category',
        'name',
        'budgeted',
        'spent',
        'remaining',
        'actions',
      ],
      pagination: {
        sortBy: 'label',
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
    }
  },
  created() {
    this.updateBudget = debounce(this.updateBudget, 1000)
    this.pagination = this.$q.localStorage.has('budgetPagination')
      ? this.$q.localStorage.getItem('budgetPagination')
      : {
          sortBy: 'label',
          descending: false,
          page: 1,
          rowsPerPage: 10,
          // rowsNumber: xx if getting data from a server
        }
  },
  methods: {
    ...mapActions('budgets', ['updateBudgetByKey']),
    updateBudget(budgetId, key, val) {
      // console.log(budgetId, key, val)
      this.updateBudgetByKey({ budgetId, key, val })
      updateBudgetByKey(this.$route.params.id, budgetId, key, val)
        .then(() => {
          // console.log('updated')
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Budget: Updated Successfully',
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
  },
  computed: {
    ...mapGetters('projects', ['project']),
    ...mapGetters('budgets', [
      'budgetCategoryOptions',
      'budgets',
      'budgetCategories',
      'budgetOptions',
    ]),
    budgetsFiltered() {
      if (this.$route.params.budgetCategory) {
        let budgets = []
        for (var key in this.budgets) {
          if (
            this.$route.params.budgetCategory === this.budgets[key].category
          ) {
            budgets.push(this.budgets[key])
          }
        }
        return budgets
      } else {
        let budgets = []
        for (var category in this.budgets) {
          budgets.push(this.budgets[category])
        }
        return budgets
      }
    },
  },
  components: {
    'sp-delete-btn': defineAsyncComponent(() =>
      import('./sp-delete-btn.vue')
    ),
    'sp-budget-import': defineAsyncComponent(() =>
      import('./sp-budget-import.vue')
    ),
  },
}
</script>
