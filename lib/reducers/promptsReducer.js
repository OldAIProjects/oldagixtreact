import {
  ADD_PROMPT,
  RETRIEVE_PROMPT,
  RETRIEVE_PROMPT_BY_NAME,
  UPDATE_PROMPT,
  DELETE_PROMPT,
  UPDATE_CURRENT_PROMPT,
} from "@/lib/actions/types";

const initialState = { current_prompt: {}, prompts: [], prompts_names: [] };

function promptReducer(prompts = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_PROMPT:
      return {
        ...prompts,
        prompts: payload.prompts,
        prompts_names: payload.prompts_names,
      };

    case RETRIEVE_PROMPT:
      return { ...prompts, prompts_names: payload };

    case RETRIEVE_PROMPT_BY_NAME:
      return {
        ...prompts,
        prompts: [...prompts.prompts, payload],
        current_prompt:
          Object.keys(prompts.current_prompt).length === 0
            ? {
                name: payload.name,
                prompt: payload.prompt,
                new_name: payload.name,
              }
            : prompts.current_prompt,
      };

    case UPDATE_PROMPT:
      return payload;

    case DELETE_PROMPT:
      return {
        ...prompts,
        prompts_names: prompts.prompts_names.filter((item) => {
          return item !== payload.name;
        }),
        prompts: prompts.prompts.filter((item) => {
          return item.name !== payload.name;
        }),
      };

    case UPDATE_CURRENT_PROMPT:
      return { ...prompts, current_prompt: payload };

    default:
      return prompts;
  }
}

export default promptReducer;
