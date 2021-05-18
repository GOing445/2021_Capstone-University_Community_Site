<template>
  <v-simple-table fixed-header height="470">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">X</th>
          <th class="text-center">월</th>
          <th class="text-center">화</th>
          <th class="text-center">수</th>
          <th class="text-center">목</th>
          <th class="text-center">금</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in table" :key="item.name">
          <td v-html="item.name"></td>
          <td>{{ item.mon }}</td>
          <td>{{ item.tue }}</td>
          <td>{{ item.wed }}</td>
          <td>{{ item.thu }}</td>
          <td>{{ item.fri }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { daelimDietaryTable } from "@/api/daelim.js";

export default {
  data() {
    return {
      table: [],
    };
  },

  async created() {
    try {
      const { data } = await daelimDietaryTable();
      const table = data.data;
      this.table = [
        {
          name: table.CNM11,
          mon: table.CCT11,
          tue: table.CCT21,
          wed: table.CCT31,
          thu: table.CCT41,
          fri: table.CCT51,
        },
        {
          name: table.CNM12,
          mon: table.CCT12,
          tue: table.CCT22,
          wed: table.CCT32,
          thu: table.CCT42,
          fri: table.CCT52,
        },
        {
          name: table.CNM13,
          mon: table.CCT13,
          tue: table.CCT23,
          wed: table.CCT33,
          thu: table.CCT43,
          fri: table.CCT53,
        },
        {
          name: table.CNM14,
          mon: table.CCT14,
          tue: table.CCT24,
          wed: table.CCT34,
          thu: table.CCT44,
          fri: table.CCT54,
        },
        {
          name: table.CNM15,
          mon: table.CCT15,
          tue: table.CCT25,
          wed: table.CCT35,
          thu: table.CCT45,
          fri: table.CCT55,
        },
        {
          name: table.CNM16,
          mon: table.CCT16,
          tue: table.CCT26,
          wed: table.CCT36,
          thu: table.CCT46,
          fri: table.CCT56,
        },
        {
          name: table.CNM17,
          mon: table.CCT17,
          tue: table.CCT27,
          wed: table.CCT37,
          thu: table.CCT47,
          fri: table.CCT57,
        },
        {
          name: table.CNM18,
          mon: table.CCT18,
          tue: table.CCT28,
          wed: table.CCT38,
          thu: table.CCT48,
          fri: table.CCT58,
        },
        {
          name: table.CNM19,
          mon: table.CCT19,
          tue: table.CCT29,
          wed: table.CCT39,
          thu: table.CCT49,
          fri: table.CCT59,
        },
      ];
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>
