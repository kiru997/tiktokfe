const listLanguages = (languages = []) => {
  return languages.map((language, index) => {
    return (
      <div key={index} className="region-item">
        {language.language}
      </div>
    );
  });
};

export default listLanguages;
