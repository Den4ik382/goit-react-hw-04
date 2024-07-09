import { Field, Formik, Form } from "formik";
import css from "./SearchBar.module.css";
export default function SearchBar({ onSubmit }) {
  const handleSubmit = (values, actions) => {
    onSubmit(values.inp);
    actions.resetForm();

    // onSubmit();
  };
  return (
    <header className={css.header}>
      <Formik
        initialValues={{
          inp: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            className={css.input}
            type="text"
            placeholder="Search images and photos"
            name="inp"
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
}
