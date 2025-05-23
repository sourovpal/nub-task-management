<script setup>
import { storeToRefs } from "pinia";
import { authStore } from "@stores";
import { usePush } from "@routers";
import { reactive, ref } from "vue";
import Http from "@services";

const attributes = reactive({
    email: "",
    password: "",
});

const validationErrors = ref({});
const isLoading = ref(false);

function handleLogin() {
    isLoading.value = true;
    Http.auth
        .login(attributes)
        .then(({ data, token }) => {
            authStore.setUser(data);
            authStore.setToken(token);
            attributes.email = "";
            attributes.password = "";
            return usePush({ path: "/" });
        })
        .catch(({ errors }) => {
            validationErrors.value = errors;
        })
        .finally(() => {
            isLoading.value = false;
        });
}
</script>
<template>
    <div
        class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 pt-[5rem]"
    >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
                class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
            >
                Sign in to your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent>
                <div>
                    <label
                        for="email"
                        class="block text-sm/6 font-medium text-gray-900"
                        >Email address</label
                    >
                    <div class="mt-2">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            required
                            v-model="attributes.email"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        />
                        <span
                            v-if="
                                validationErrors['email'] &&
                                validationErrors['email'].length
                            "
                            class="text-red-500 text-sm/6"
                        >
                            {{ validationErrors["email"][0] }}
                        </span>
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label
                            for="password"
                            class="block text-sm/6 font-medium text-gray-900"
                            >Password</label
                        >
                        <div class="text-sm">
                            <a
                                href="#"
                                class="font-semibold text-green-600 hover:text-green-500"
                                >Forgot password?</a
                            >
                        </div>
                    </div>
                    <div class="mt-2">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="current-password"
                            required
                            v-model="attributes.password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                        />
                        <span
                            v-if="
                                validationErrors['password'] &&
                                validationErrors['password'].length
                            "
                            class="text-red-500 text-sm/6"
                        >
                            {{ validationErrors["password"][0] }}
                        </span>
                    </div>
                </div>

                <div>
                    <Button
                        :loading="isLoading"
                        @click="handleLogin"
                        type="button"
                        label="Sign in"
                        class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                    </Button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?
                <a
                    href="#"
                    class="font-semibold text-green-600 hover:text-green-500"
                    >Register Here</a
                >
            </p>
        </div>
    </div>
</template>
