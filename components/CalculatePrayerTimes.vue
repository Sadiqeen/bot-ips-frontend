<template>
    <div class="box my-5 has-background-primary p-2">
        <div class="box">
            <form @submit.prevent="updatePrayerTimes">
                <div class="columns is-multiline is-mobile is-centered">
                    <div class="column is-one-third">
                        <b-field label="เลือกอำเภอ" :type="formErrors('imsak')" :message="formErrors('imsak', true)">
                            <b-autocomplete :data="auto_complete.data" placeholder="เลือกอำเภอ"
                                :custom-formatter="(option) => option.name + ' > ' + option.page.name"
                                :loading="auto_complete.isFetching" open-on-focus
                                @select="option => auto_complete.selected = option">
                                <template slot-scope="props">
                                    {{ props.option.name }} > {{ props.option.page.name }}
                                </template>
                            </b-autocomplete>
                        </b-field>
                    </div>

                    <div class="column is-one-third">
                        <b-field label="วิธีการคำนวน">
                            <b-select placeholder="Select a name" v-model="selected_method" expanded>
                                <option v-for="option in method_json" :value="option.value" :key="option.key">
                                    {{ option.key }}
                                </option>
                            </b-select>
                        </b-field>
                    </div>

                    <div class="column is-one-third">
                        <b-field label="เลือกวัน">
                            <b-datepicker placeholder="Select a date..." icon="calendar-today" locale="th-TH" v-model="selected_date">
                            </b-datepicker>
                        </b-field>
                    </div>

                    <div class="column is-2-desktop is-4-tablet  is-full-mobile">
                        <b-field label="imsak" :type="formErrors('imsak')" :message="formErrors('imsak', true)">
                            <b-numberinput v-model="form_adjust.imsak" min="-10" max="10" required></b-numberinput>
                        </b-field>
                    </div>

                    <div class="column is-2-desktop is-4-tablet is-6-mobile">
                        <b-field label="fajr" :type="formErrors('fajr')" :message="formErrors('fajr', true)">
                            <b-numberinput v-model="form_adjust.fajr" min="-10" max="10" required></b-numberinput>
                        </b-field>
                    </div>

                    <div class="column is-2-desktop is-4-tablet is-6-mobile">
                        <b-field label="dhuhr" :type="formErrors('dhuhr')" :message="formErrors('dhuhr', true)">
                            <b-numberinput v-model="form_adjust.dhuhr" min="-10" max="10" required></b-numberinput>
                        </b-field>
                    </div>

                    <div class="column is-2-desktop is-4-tablet is-6-mobile">
                        <b-field label="asr" :type="formErrors('asr')" :message="formErrors('asr', true)">
                            <b-numberinput v-model="form_adjust.asr" min="-10" max="10" required></b-numberinput>
                        </b-field>
                    </div>

                    <div class="column is-2-desktop is-4-tablet is-6-mobile">
                        <b-field label="maghrib" :type="formErrors('maghrib')" :message="formErrors('maghrib', true)">
                            <b-numberinput v-model="form_adjust.maghrib" min="-10" max="10" required></b-numberinput>
                        </b-field>
                    </div>

                    <div class="column is-2-desktop is-4-tablet is-6-mobile">
                        <b-field label="isha" :type="formErrors('isha')" :message="formErrors('isha', true)">
                            <b-numberinput v-model="form_adjust.isha" min="-10" max="10" required></b-numberinput>
                        </b-field>
                    </div>

                    <div class="column is-2-desktop is-4-tablet is-6-mobile">
                        <b-field label="sunrise" :type="formErrors('sunrise')" :message="formErrors('sunrise', true)">
                            <b-numberinput v-model="form_adjust.sunrise" min="-10" max="10" type="is-warning"
                                required></b-numberinput>
                        </b-field>
                    </div>

                    <div class="column is-2-desktop is-4-tablet is-6-mobile">
                        <b-field label="sunset" :type="formErrors('sunset')" :message="formErrors('sunset', true)">
                            <b-numberinput v-model="form_adjust.sunset" min="-10" max="10" type="is-warning"
                                required></b-numberinput>
                        </b-field>
                    </div>

                    <div class="column is-2-desktop is-4-tablet is-6-mobile">
                        <b-field label="midnight" :type="formErrors('midnight')"
                            :message="formErrors('midnight', true)">
                            <b-numberinput v-model="form_adjust.midnight" min="-10" max="10" type="is-warning"
                                required></b-numberinput>
                        </b-field>
                    </div>

                    <div class="column is-full">
                        <b-field label="">
                            <div class="columns is-mobile">
                                <div class="column">
                                    <b-button type="is-danger" expanded @click="calPrayerTimes()">
                                        คำนวน
                                    </b-button>
                                </div>
                                <div class="column">
                                    <b-button type="is-primary" native-type="submit" expanded>
                                        บันทึก
                                    </b-button>
                                </div>
                            </div>
                        </b-field>
                    </div>
                </div>
            </form>

            <div class="mt-5" v-if="prayer_times">
                <table class="table is-striped is-narrow is-hoverable is-fullwidth is-center has-text-centered">
                    <tbody>
                        <tr>
                            <td>Fajr</td>
                            <td>{{ prayer_times.Fajr }}</td>
                        </tr>

                        <tr>
                            <td>Sunrise</td>
                            <td>{{ prayer_times.Sunrise }}</td>
                        </tr>

                        <tr>
                            <td>Dhuhr</td>
                            <td>{{ prayer_times.Dhuhr }}</td>
                        </tr>

                        <tr>
                            <td>Asr</td>
                            <td>{{ prayer_times.Asr }}</td>
                        </tr>

                        <tr>
                            <td>Sunset</td>
                            <td>{{ prayer_times.Sunset }}</td>
                        </tr>

                        <tr>
                            <td>Maghrib</td>
                            <td>{{ prayer_times.Maghrib }}</td>
                        </tr>

                        <tr>
                            <td>Isha</td>
                            <td>{{ prayer_times.Isha }}</td>
                        </tr>

                        <tr>
                            <td>Imsak</td>
                            <td>{{ prayer_times.Imsak }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<script>
import ConfigTable from "~/components/ConfigTable.vue";
import method_json from "~/data/method.json";

export default {
    name: "Config",
    middleware: "auth",

    data() {
        return {
            form_errors: {},
            form_adjust: {
                imsak: 0,
                fajr: 0,
                sunrise: 0,
                dhuhr: 0,
                asr: 0,
                maghrib: 0,
                sunset: 0,
                isha: 0,
                midnight: 0,
            },
            auto_complete: {
                isFetching: false,
                data: [],
                selected: null,
            },
            prayer_times: null,
            selected_method: null,
            selected_date: new Date(),
            method_json
        };
    },

    components: {
        ConfigTable,
    },

    mounted() {
        this.getDefaultAdjustment();
        this.getAsyncData();
    },

    methods: {
        async getDefaultAdjustment() {
            try {
                const { data } = await this.$axios.get(`adjustment`);

                this.form_adjust = data;
            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            }
        },

        async getAsyncData() {
            this.auto_complete.data = [];
            this.auto_complete.isFetching = true;

            try {
                const { data } = await this.$axios.$get(`districts?sort_by=name.asc&search=เมือง`);

                data.data.forEach((item) => this.auto_complete.data.push(item));
            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            } finally {
                this.auto_complete.isFetching = false;
            }
        },

        async updatePrayerTimes() {
            const method = this.selected_method;

            const body = {
                ...this.form_adjust,
                method: method
            };

            try {
                await this.$axios.post(`adjustment`, body);

                this.$buefy.toast.open({
                    message: "แก้ไขสำเร็จ!!",
                    type: "is-success",
                });

            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            }
        },

        async calPrayerTimes() {
            const autoComplete = this.auto_complete.selected;
            const method = this.selected_method;

            if (!autoComplete || !method) {
                this.$buefy.toast.open({
                    message: "กรุณาเลือกเลือกอำเภอและวิธีคำนวน",
                    type: "is-danger",
                });

                return;
            }

            const body = {
                ...this.form_adjust,
                lat: this.auto_complete.selected.lat,
                long: this.auto_complete.selected.long,
                date: this.selected_date,
                method: method
            };

            try {
                const { data } = await this.$axios.get(`adjustment/prayer-time`, { params: body });

                this.prayer_times = data.data;

            } catch (e) {
                console.error(e);

                this.$buefy.toast.open({
                    message: "มีข้อผิดพลาด!!",
                    type: "is-danger",
                });
            }
        },

        formErrors(field, messages = false) {
            if (this.form_errors.hasOwnProperty(field)) {
                return messages ? this.form_errors[field][0] : "is-danger";
            }
        },
    },
};
</script>
