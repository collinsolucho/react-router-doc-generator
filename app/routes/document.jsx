// routes/documents.jsx
import { useLoaderData, useSearchParams } from "react-router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportCard } from "../components/ReportCard"; // Your PDF template
import { getResults } from "../model/database";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  return await getResults(page, 2);
}

export default function Document() {
  const { documents, currentPage, hasNextPage, hasPrevPage } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <main className="max-w-6xl mx-auto p-5 flex flex-col min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        Learner Details
      </h1>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc._id}
            className="p-6 border rounded-xl shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <section className="space-y-1">
              <h3 className="font-bold text-xl capitalize text-blue-900">
                {doc.name}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <p>
                  Maths:{" "}
                  <span className="font-semibold text-black">{doc.maths}</span>
                </p>
                <p>
                  English:{" "}
                  <span className="font-semibold text-black">
                    {doc.english}
                  </span>
                </p>
                <p>
                  Swahili:{" "}
                  <span className="font-semibold text-black">
                    {doc.swahili}
                  </span>
                </p>
                <p>
                  Programming:{" "}
                  <span className="font-semibold text-black">
                    {doc.programming}
                  </span>
                </p>
              </div>
              <p className="font-bold text-lg mt-2 text-slate-800 border-t pt-2">
                Total: {doc.totals}
              </p>
            </section>

            {/* The PDF Generation happens here on the client side */}
            <PDFDownloadLink
              document={<ReportCard data={doc} />}
              fileName={`${doc.name.replace(/\s+/g, "_")}_Report.pdf`}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              {({ loading }) => (loading ? "Preparing..." : "Download PDF")}
            </PDFDownloadLink>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-6 mt-12 bg-slate-50 p-4 rounded-lg self-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="px-4 py-2 border rounded-md disabled:opacity-30 bg-white shadow-sm hover:bg-slate-50 transition-colors"
        >
          ← Previous
        </button>
        <span className="font-medium">Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="px-4 py-2 border rounded-md disabled:opacity-30 bg-white shadow-sm hover:bg-slate-50 transition-colors"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
