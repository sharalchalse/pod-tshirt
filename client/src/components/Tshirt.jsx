import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Tshirt = () => {
  const [formVersion, setFormVersion] = useState(1);
  const [borderVersion, setBorderVersion] = useState(1);
  const [buttonVersion, setButtonVersion] = useState(1);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === "q") {
        setFormVersion((prev) => (prev % 3) + 1);
        setBorderVersion((prev) => (prev % 3) + 1);
        setButtonVersion((prev) => (prev % 3) + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      height: 180,
      weight: 80,
      build: "athletic",
      text: "",
    },
  });

  const onSubmit = (data) => {
    toast.success("Design submitted successfully", {
      className: "toastify-custom",
    });
    console.log("Form Data:", data);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formTheme = [
    "bg-dark text-white",
    "bg-secondary text-white",
    "bg-light text-dark",
  ];
  const borderTheme = [
    "border border-success rounded-2",
    "border border-dark",
    "border border-primary-subtle",
  ];
  const buttonTheme = ["btn-success", "btn-dark", "btn-primary"];

  return (
    <div  style={{ minHeight: "100vh" }}className={`py-5  ${formTheme[formVersion - 1]}`}>
      <div
       
        className="container d-flex justify-content-between align-items-center mb-4 "
      >
        <h1 className="text-center mb-0 flex-grow-1">
          Print On Demand T-shirt Store
        </h1>
        <button
          type="button"
          className={`border rounded-2  btn ${buttonTheme[buttonVersion - 1]} ms-3`}
          onClick={() => {
            setFormVersion((prev) => (prev % 3) + 1);
            setBorderVersion((prev) => (prev % 3) + 1);
            setButtonVersion((prev) => (prev % 3) + 1);
          }}
        >
          <img  src="/images/themes-icon.png"  alt="" height="30px" width="30px" />
            
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <div className="row gy-4">
          {/* LEFT COLUMN */}
          <div className="col-12 col-md-6">
            <div
              className={`mb-4 ${borderTheme[borderVersion - 1]} p-4 border-4`}
            >
              <div className="mb-3">
                <label className="form-label">Height (cm):</label>
                <input
                  className="form-control"
                  type="number"
                  {...register("height")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Weight (kg):</label>
                <input
                  className="form-control"
                  type="number"
                  {...register("weight")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Build:</label>
                <select className="form-select" {...register("build")}>
                  <option value="lean">Lean</option>
                  <option value="regular">Regular</option>
                  <option value="athletic">Athletic</option>
                  <option value="big">Big</option>
                </select>
              </div>
            </div>

            <div
              className={`mb-4 ${borderTheme[borderVersion - 1]} p-4 border-4`}
            >
              <textarea
                className="form-control"
                placeholder="Type text for your T-shirt design (max 3 lines)"
                {...register("text")}
                maxLength={150}
              />
              <div className="form-text text-muted">
                {watch("text")?.length || 0} / 150 characters
              </div>
            </div>

            <button
              type="submit"
              onSubmit={handleSubmit(onSubmit)}
              className={`btn w-100 fs-5 ${buttonTheme[buttonVersion - 1]}`}
            >
              Submit Design
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-12 col-md-6">
            <div
              className={`mb-4 ${borderTheme[borderVersion - 1]} p-4 border-4`}
            >
              <label htmlFor="upload-img" className="form-label">
                Drop an image here or click to upload
              </label>
              <input
                className="form-control"
                type="file"
                id="upload-img"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div
              className="position-relative mx-auto"
              style={{ width: "100%", maxWidth: "430px", height: "400px" }}
            >
              <img
                src="/images/t-shirt.png"
                className="img-fluid w-100 h-100"
                alt="T-shirt"
                style={{ objectFit: "cover" }}
              />

              {image && (
                <img
                  src={image}
                  alt="Uploaded Design"
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: "60%",
                    maxHeight: "40%",
                    objectFit: "contain",
                  }}
                />
              )}

              {!image && watch("text") && (
                <div
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60%",
                    maxHeight: "40%",
                    overflow: "hidden",
                    textAlign: "center",
                    color: "black",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    lineHeight: "1.2",
                    wordWrap: "break-word",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {watch("text")
                    .split("\n")
                    .slice(0, 3)
                    .map((line, index) => (
                      <div
                        key={index}
                        style={{
                          whiteSpace: "pre-wrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {line}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Tshirt;
