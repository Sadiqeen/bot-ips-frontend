<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">อัปโหลดรูปภาพ</p>
            <button type="button" class="delete" @click="closeModal()" />
        </header>
        <section class="modal-card-body">
            <div
                class="is-inline-flex is-flex-direction-column is-align-items-center has-background-white py-5 is-fullwidth">

                <b-field v-if="!dropFile">
                    <b-upload v-model="dropFile" drag-drop accept="image/png, image/jpg, image/jpeg">
                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon icon="upload" size="is-large">
                                    </b-icon>
                                </p>
                                <p>Drop your files here or click to upload</p>
                            </div>
                        </section>
                    </b-upload>
                </b-field>

                <template v-else>
                    <a :href="src" target="_blank">
                        <b-image :src="src" responsive class="mb-5"></b-image>
                    </a>
                </template>

                <div class="tags" v-if="dropFile">
                    <span class="tag is-primary">
                        {{ dropFile.name }}
                        <button class="delete is-small" type="button" @click="deleteDropFile()">
                        </button>
                    </span>
                </div>

            </div>
        </section>

        <footer class="modal-card-foot is-flex is-justify-content-space-between">
            <b-button @click="closeModal()">ยกเลิก</b-button>

            <b-button class="is-success" @click="submitImage()" :disabled="!dropFile"
                :loading="isLoading">บันทึก</b-button>
        </footer>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true,
        },
        image_name: {
            type: String | null,
            required: true,
        },
    },
    data() {
        return {
            dropFile: this.image_name ? new File([""], this.image_name) : null,
            src: this.image_name ? process.env.API + '/api/file/' + this.image_name.replace(".", "_") : "",
            isLoading: false
        };
    },
    watch: {
        dropFile: function (newVal, oldVal) {

            if (newVal !== null) {
                this.src = URL.createObjectURL(newVal);
            }
        },
    },
    methods: {
        deleteDropFile() {
            this.dropFile = null;
        },

        async submitImage() {
            this.isLoading = true;
            this.$buefy.toast.open("กำลังส่งข้อมูล...");

            try {
                const formData = new FormData();
                formData.append("file", this.dropFile);
                formData.append("id", this.id);

                await this.$axios.post("file/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                this.$buefy.toast.open({
                    message: "บันทึกข้อมูลเสร็จสิ้น!!",
                    type: "is-success",
                });

                this.$emit('reloadData');

            } catch (e) {
                if (e.response.status == 422) {
                    this.$buefy.toast.open({
                        duration: 10000,
                        message: e.response.data.file[0],
                        type: "is-danger",
                    });
                } else {
                    console.error(e);

                    this.$buefy.toast.open({
                        message: "มีข้อผิดพลาด!!",
                        type: "is-danger",
                    });
                }
            } finally {
                this.isLoading = false;

                this.closeModal();
            }
        },

        closeModal() {
            if (this.isLoading) {
                return;
            }
            this.dropFile = null;
            this.src = "";
            this.$emit('close');
        }
    }
};
</script>
