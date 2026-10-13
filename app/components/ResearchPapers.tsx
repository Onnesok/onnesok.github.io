import { researchPapers } from "../data/research";
import { profile } from "../data/profile";

export default function ResearchPapers() {
  return (
    <div className="research-papers" aria-labelledby="papers-heading">
      <div className="papers-heading">
        <h3 id="papers-heading">Research papers</h3>
        <span>{researchPapers.length} papers</span>
      </div>
      <ol className="paper-list">
        {researchPapers.map((paper, index) => (
          <li id={`paper-${paper.id}`} key={paper.id} className="paper-entry">
            <span className="paper-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="paper-content">
              <h4>{paper.title}</h4>
              <p className="paper-authors">
                {paper.authors.map((author, authorIndex) => (
                  <span
                    key={author}
                    className={
                      author === profile.name ? "paper-author-self" : undefined
                    }
                  >
                    {author}
                    {authorIndex < paper.authors.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
              {"conference" in paper && (
                <p className="paper-conference">
                  <span>Target conference:</span> {paper.conference}
                </p>
              )}
              {paper.targetJournal && (
                <p className="paper-journal">
                  <span>Target journal:</span> {paper.targetJournal}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
