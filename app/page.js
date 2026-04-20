import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          textAlign: "center",
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "40px"
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            fontSize: "2rem"
          }}
        >
          Household Appliance Inventory
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <Link
            href="pages/part-b"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              border: "1px solid #333",
              borderRadius: "8px",
              textDecoration: "none"
            }}
          >
            Register Appliance
          </Link>
        </div>

        <div>
          <Link
            href="pages/part-c"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              border: "1px solid #333",
              borderRadius: "8px",
              textDecoration: "none"
            }}
          >
            Validate / Search Appliance
            </Link>
        </div>
      </div>
    </main>
  );
}