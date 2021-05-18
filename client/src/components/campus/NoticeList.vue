<template>
  <div>
    <v-list two-line height="470" style="overflow: scroll">
      <v-list-item-group active-class="pink--text">
        <template v-for="(item, index) in items">
          <v-list-item :key="item.subject">
            <v-list-item-content @click.stop="showContent(index)">
              <v-list-item-title v-text="item.subject"></v-list-item-title>

              <v-list-item-subtitle
                class="text--primary"
                v-text="item.auther"
              ></v-list-item-subtitle>

              <v-list-item-subtitle
                v-text="`조회 ${item.hits}`"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text
                v-text="item.date"
              ></v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>

          <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <!-- 다이얼로그 -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">
          {{ contents.subject }}
        </v-card-title>

        <v-card-text v-html="contents.content"></v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"> 닫기 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { daelimNotice } from "@/api/daelim.js";
// import { res } from "./noticedummy.js";

export default {
  data() {
    return {
      dialog: false,
      items: [],
      contents: {
        subject: "",
        content: "",
      },
    };
  },
  async created() {
    try {
      const { data } = await daelimNotice(1);
      for (const bulletin of data.data.list) {
        const data = {
          subject: bulletin.SUBJECT,
          auther: bulletin.WRITER_NM,
          hits: bulletin.HITS,
          date: bulletin.WRITE_DATE,
          contents: bulletin.CONTENTS,
        };
        this.items.push(data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    showContent(idx) {
      this.dialog = true;
      this.contents.subject = this.items[idx].subject;
      this.contents.content = this.items[idx].contents;
    },
  },
};
</script>

<style></style>
