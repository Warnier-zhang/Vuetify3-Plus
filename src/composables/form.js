// Vue
import {ref} from 'vue';

// Vuelidate
import {useVuelidate} from '@vuelidate/core';
import * as validators from '@vuelidate/validators'

export function useForm() {
    const createRules = (specs) => {
        return specs.map((spec) => {
            return (input) => {
                if (validators[spec.name]) {
                    let rules = {
                        input: {}
                    };
                    if (spec.args && spec.args.length > 0) {
                        rules.input[spec.name] = validators[spec.name](...spec.args);
                    } else {
                        rules.input[spec.name] = validators[spec.name];
                    }

                    let state = ref({});
                    state.value ['input'] = input;

                    let v$ = useVuelidate(rules, state);
                    v$.value.$validate();
                    if (v$.value.input.$error) {
                        return spec.message ? spec.message : v$.value.input.$errors.map(e => e.$message)[0];
                    }
                }
                return true;
            };
        });
    };
    return {createRules};
}
