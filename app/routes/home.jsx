import { Form, Link, useActionData, data, useNavigation } from "react-router";
import { AddResults } from "../model/database";
import {
  commitSession,
  getSession,
  setErrorMessage,
  setSuccessMessage,
} from "../.server/session";
import { useEffect, useRef } from "react";

export function meta() {
  return [
    { title: "File Downloader" },
    {
      name: "description",
      content: "Easily Download your Files. Here is a Template!",
    },
  ];
}

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  let formData = await request.formData();
  // console.log(formData);
  let name = formData.get("name");
  let maths = formData.get("maths");
  let english = formData.get("english");
  let swahili = formData.get("swahili");
  let programming = formData.get("programming");
  let totals =
    Number(maths) + Number(english) + Number(swahili) + Number(programming);

  let details = { name, maths, english, swahili, programming, totals };
  try {
    let addedResult = await AddResults(details);
    if (addedResult) {
      setSuccessMessage(session, "User details have been added");

      // IMPORTANT: You must return a Response with the Header
      return data(
        { success: true, student: addedResult },
        {
          headers: { "Set-Cookie": await commitSession(session) },
        }
      );
    }
  } catch (error) {
    setErrorMessage(session, "Failed to add user Details!");
    return data(
      { success: false },
      {
        headers: { "Set-Cookie": await commitSession(session) },
      }
    );
  }
}

export default function Home() {
  let data = useActionData();
  //use form.ref to clear the form if data is true from the action data
  let formRef = useRef();
  useEffect(() => {
    if (data?.success) {
      formRef.current?.reset(); // Clears the form fields
    }
  }, [data]);
  let navigation = useNavigation(); // for submitting state
  let isSubmitting = navigation.state === "submitting";
  return (
    <main>
      <Form
        // {formRef}
        ref={formRef}
        method="post"
        className="max-w-5xl mx-auto min-h-screen justify-center flex flex-col p-5"
      >
        <h1 className="font-bold text-2xl text-center">Welcome to our Page</h1>

        <h2>please add the following fields to generate pdf</h2>
        <label htmlFor="name" className="my-4">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Students name...."
            className="border-2  p-1"
            required
          />
        </label>

        <label htmlFor="maths" className="my-4">
          Maths{" "}
          <input
            type="number"
            name="maths"
            id="maths"
            required
            // max={99}
            min={5}
            className="border-2 p-1 rounded-lg"
            placeholder="add maths score"
          />
        </label>
        <label htmlFor="english" className="my-4">
          english{" "}
          <input
            type="number"
            name="english"
            id="english"
            required
            // max={99}
            min={5}
            className="border-2 p-1 rounded-lg"
            placeholder="add english score"
          />
        </label>

        <label htmlFor="swahili" className="my-4">
          swahili{" "}
          <input
            type="number"
            name="swahili"
            id="swahili"
            required
            // max={99}
            min={5}
            className="border-2 p-1 rounded-lg"
            placeholder="add swahili score"
          />
        </label>

        <label htmlFor="programming" className="my-4">
          programming{" "}
          <input
            type="number"
            name="programming"
            id="programming"
            required
            // max={99}
            min={5}
            className="border-2 p-1 rounded-lg"
            placeholder="add programming score"
          />
        </label>

        <button
          type="submit"
          className="border-2 p-1 m-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting.." : "submit"}
        </button>

        <Link to="/documents" className="border-2 p-1 m-1 text-center">
          Download Document ➡️
        </Link>
      </Form>
    </main>
  );
}
