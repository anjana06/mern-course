import { useNavigation } from "react-router-dom";
export const SubmitBtn = ({formBtn }) => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"
    return (
      <>
        <button
          type="submit"
          className={`btn btn-block ${formBtn && 'form-btn'} `}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </>
    );
}