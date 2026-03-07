import { Form } from "react-router";

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
  let formData = await request.formData();
  console.log(formData);
}

export default function Home() {
  return (
    <main>
      <Form
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

        <button type="submit" className="border-2 p-1 m-1">
          Generate pdf
        </button>
      </Form>
    </main>
  );
}
