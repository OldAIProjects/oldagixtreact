import {
  ADD_PROMPT,
  RETRIEVE_PROMPT,
  RETRIEVE_PROMPT_BY_NAME,
  UPDATE_PROMPT,
  UPDATE_CURRENT_PROMPT,
  DELETE_PROMPT,
} from "./types";

import {
  getPrompt,
  addPrompt,
  getPromptByName,
  updatePromptByName,
  patchPromptName,
  deletePromptByName,
  getPromptArgsByName,
} from "@/lib/api/apiEndpoints";

export const addPrompts = () => async (dispatch, getState) => {
  try {
    const new_prompt = { ...getState().prompt.current_prompt };
    if (
      !getState().prompt.prompts.find(
        (item) => item.name === new_prompt.new_name
      )
    ) {
      const resAddprompt = await addPrompt({
        prompt_name: new_prompt.new_name,
        prompt: new_prompt.prompt,
      });

      const payload = {
        prompts: [
          ...getState().prompt.prompts,
          {
            name: new_prompt.new_name,
            prompt: new_prompt.prompt,
          },
        ],
        prompts_names: [
          ...getState().prompt.prompts_names,
          new_prompt.new_name,
        ].sort(),
      };

      const new_prompts = {
        name: new_prompt.new_name,
        prompt: new_prompt.prompt,
      };

      dispatch({
        type: ADD_PROMPT,
        payload: payload,
      });

      return Promise.resolve(payload);
    }
    return Promise.reject("prompt already exists");
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updatePrompt = () => async (dispatch, getState) => {
  try {
    const current_prompt = { ...getState().prompt.current_prompt };
    const prompt = getState().prompt.prompts.find(
      (item) => item.name === current_prompt.name
    );

    if (prompt && prompt.prompt !== current_prompt.prompt) {
      const res = await updatePromptByName(current_prompt.name, {
        prompt_name: current_prompt.name,
        prompt: current_prompt.prompt,
      });

      const prompt = {
        ...getState().prompt,
        prompts: getState().prompt.prompts.map((item) => {
          if (item.name === current_prompt.name)
            return {
              name: current_prompt.name,
              prompt: current_prompt.prompt,
            };
          else return item;
        }),
      };

      dispatch({
        type: UPDATE_PROMPT,
        payload: prompt,
      });

      return Promise.resolve(prompt);
    } else {
      return Promise.reject("prompt already exists");
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updatePromptName =
  () => async (dispatch, getState) => {
    try {
      const current_prompt = { ...getState().prompt.current_prompt };
      if (
        getState().prompt.prompts.find(
          (item) => item.name === current_prompt.name
        ) &&
        current_prompt.name !== current_prompt.new_name &&
        !getState().prompt.prompts.find(
          (item) => item.name === current_prompt.new_name
        )
      ) {
        const res = await patchPromptName(current_prompt.name, {
          prompt_name: current_prompt.new_name,
        });
        const prompt = {
          ...getState().prompt,
          prompts_names: getState()
            .prompt.prompts_names.map((name) => {
              if (name === current_prompt.name) return current_prompt.new_name;
              else return name;
            })
            .sort(),
          prompts: getState().prompt.prompts.map((item) => {
            if (item.name === current_prompt.name)
              return {
                name: current_prompt.new_name,
                prompt: current_prompt.prompt,
              };
            else return item;
          }),
        };

        dispatch({
          type: UPDATE_PROMPT,
          payload: prompt,
        });

        return Promise.resolve(current_prompt);
      } else {
        return Promise.reject("prompt name already in use");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const retrievePrompts = () => async (dispatch, getState) => {
  try {
    if (getState().prompt.prompts_names.length === 0) {
      const res = await getPrompt();
      const prompts = [...new Set(res.data.prompts)].sort();

      dispatch({
        type: RETRIEVE_PROMPT,
        payload: prompts,
      });
      return Promise.resolve(prompts);
    } else {
      dispatch({
        type: RETRIEVE_PROMPT,
        payload: getState().prompt.prompts_names,
      });
      return Promise.resolve(getState().prompt.prompts_names);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrievePromptByName =
  (prompt_name) => async (dispatch, getState) => {
    try {
      const prompt = getState().prompt.prompts.find(
        (item) => item.name === prompt_name
      );
      if (!prompt) {
        const res = await getPromptByName(prompt_name);

        dispatch({
          type: RETRIEVE_PROMPT_BY_NAME,
          payload: { name: prompt_name, prompt: res.data.prompt },
        });
        return Promise.resolve(res.data.prompt);
      } else {
        return Promise.resolve(prompt);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const deletePrompt = () => async (dispatch, getState) => {
  try {
    const current_prompt = { ...getState().prompt.current_prompt };
    if (
      getState().prompt.prompts.find((prompt) => prompt.name === current_prompt.new_name)
    ) {
      await deletePromptByName(current_prompt.new_name);

      dispatch({
        type: DELETE_PROMPT,
        payload: { name: current_prompt.new_name },
      });
      return Promise.resolve({ name: current_prompt.new_name });
    } else {
      console.log("There is no prompt named " + current_prompt.new_name);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateCurrentPrompt = (data) => async (dispatch, getState) => {
  try {
    const current_prompt = {
      ...getState().prompt.current_prompt,
    };

    if (data.name === "name") {
      current_prompt.new_name = data.value;
    } else if (data.name === "prompt") {
      current_prompt.prompt = data.value;
    }

    dispatch({
      type: UPDATE_CURRENT_PROMPT,
      payload: current_prompt,
    });

    return Promise.resolve(current_prompt);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const setCurrentPrompt = (prompt_name) => async (dispatch, getState) => {
  try {
    if (getState().prompt.current_prompt.name !== prompt_name) {
      const prompt = getState().prompt.prompts.find(
        (item) => item.name === prompt_name
      );
      if (!prompt) {
        const prompt = await dispatch(retrievePromptByName(prompt_name));
        dispatch({
          type: UPDATE_CURRENT_PROMPT,
          payload: {
            name: prompt_name,
            prompt: prompt.prompt,
            new_name: prompt_name,
          },
        });
      } else {
        dispatch({
          type: UPDATE_CURRENT_PROMPT,
          payload: {
            name: prompt_name,
            prompt: prompt.prompt,
            new_name: prompt_name,
          },
        });
      }
      return Promise.resolve(prompt);
    } else {
      dispatch({
        type: UPDATE_CURRENT_PROMPT,
        payload: getState().prompt.current_prompt,
      });
      return Promise.resolve(getState().prompt.current_prompt);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
