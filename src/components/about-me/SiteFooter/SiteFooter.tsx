interface Props {
  name: string;
  year: number;
}

const SiteFooter = ({ name, year }: Props) => {
  return (
    <footer className="mx-auto w-full max-w-3xl border-t border-gi-ash px-4 py-6 text-center text-sm text-gi-dark-gray">
      <p className="wrap-anywhere">
        © {year} {name}
      </p>
    </footer>
  );
};

export default SiteFooter;
