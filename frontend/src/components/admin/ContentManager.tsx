import { FormEvent, useEffect, useState } from "react";
import {
  FileText,
  FolderKanban,
  ImagePlus,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { api } from "../../services/api";
import type { BlogPost, Project } from "../../types";

type ContentType = "projects" | "blog";

const blankProject: Partial<Project> = { status: "draft", featured: false };
const blankPost: Partial<BlogPost> = { status: "draft" };

export function ContentManager() {
  const [section, setSection] = useState<ContentType>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [project, setProject] = useState<Partial<Project> | null>(null);
  const [post, setPost] = useState<Partial<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.adminList<Project>("projects"),
      api.adminList<BlogPost>("blog"),
    ])
      .then(([projectData, postData]) => {
        setProjects(projectData);
        setPosts(postData);
      })
      .catch((reason) =>
        setError(
          reason instanceof Error ? reason.message : "Unable to load content.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  function flash(message: string) {
    setNotice(message);
    setError("");
    window.setTimeout(() => setNotice(""), 3500);
  }

  async function remove(type: ContentType, id: string) {
    if (!window.confirm("Delete this item permanently? This cannot be undone."))
      return;
    try {
      await api.deleteContent(type, id);
      if (type === "projects") {
        setProjects((items) => items.filter((item) => item._id !== id));
        setProject(null);
      } else {
        setPosts((items) => items.filter((item) => item._id !== id));
        setPost(null);
      }
      flash("Item deleted.");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Unable to delete item.",
      );
    }
  }

  return (
    <section className="mt-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[.15em] text-brand">
            Website content
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-[-.03em]">
            Publish projects and articles
          </h2>
        </div>
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
          <TabButton
            active={section === "projects"}
            onClick={() => setSection("projects")}
          >
            <FolderKanban size={17} /> Projects
          </TabButton>
          <TabButton
            active={section === "blog"}
            onClick={() => setSection("blog")}
          >
            <FileText size={17} /> Blog
          </TabButton>
        </div>
      </div>

      {notice && (
        <p className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
          {notice}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"
        >
          {error}
        </p>
      )}

      {loading ? (
        <div className="mt-6 h-80 animate-pulse rounded-3xl bg-white" />
      ) : section === "projects" ? (
        <Workspace
          title="Projects"
          empty="No projects yet. Create the first case study."
          items={projects}
          selectedId={project?._id}
          onCreate={() => setProject(blankProject)}
          onEdit={(item) => setProject(item)}
          onDelete={(id) => remove("projects", id)}
          editor={
            project && (
              <ProjectEditor
                key={project._id || "new-project"}
                value={project}
                onCancel={() => setProject(null)}
                onSaved={(saved) => {
                  setProjects((items) => {
                    const exists = items.some((item) => item._id === saved._id);
                    return exists
                      ? items.map((item) =>
                          item._id === saved._id ? saved : item,
                        )
                      : [saved, ...items];
                  });
                  setProject(saved);
                  flash(
                    saved.status === "published"
                      ? "Project published."
                      : "Project saved as draft.",
                  );
                }}
              />
            )
          }
        />
      ) : (
        <Workspace
          title="Blog posts"
          empty="No articles yet. Create the first draft."
          items={posts}
          selectedId={post?._id}
          onCreate={() => setPost(blankPost)}
          onEdit={(item) => setPost(item)}
          onDelete={(id) => remove("blog", id)}
          editor={
            post && (
              <BlogEditor
                key={post._id || "new-post"}
                value={post}
                onCancel={() => setPost(null)}
                onSaved={(saved) => {
                  setPosts((items) => {
                    const exists = items.some((item) => item._id === saved._id);
                    return exists
                      ? items.map((item) =>
                          item._id === saved._id ? saved : item,
                        )
                      : [saved, ...items];
                  });
                  setPost(saved);
                  flash(
                    saved.status === "published"
                      ? "Article published."
                      : "Article saved as draft.",
                  );
                }}
              />
            )
          }
        />
      )}
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${active ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-50"}`}
    >
      {children}
    </button>
  );
}

type ListItem = {
  _id: string;
  title: string;
  status?: string;
  shortDescription?: string;
  excerpt?: string;
};
function Workspace<T extends ListItem>({
  title,
  empty,
  items,
  selectedId,
  onCreate,
  onEdit,
  onDelete,
  editor,
}: {
  title: string;
  empty: string;
  items: T[];
  selectedId?: string;
  onCreate: () => void;
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  editor: React.ReactNode;
}) {
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[360px_1fr]">
      <div className="card h-fit overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <h3 className="font-bold">{title}</h3>
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white"
          >
            <Plus size={16} /> New
          </button>
        </div>
        <div className="max-h-[720px] overflow-y-auto">
          {items.length ? (
            items.map((item) => (
              <article
                key={item._id}
                className={`border-b border-slate-100 p-5 last:border-0 ${selectedId === item._id ? "bg-brand-soft" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${item.status === "published" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                    >
                      {item.status || "draft"}
                    </span>
                    <h4 className="mt-3 font-bold">{item.title}</h4>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                      {item.shortDescription || item.excerpt}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      aria-label={`Edit ${item.title}`}
                      onClick={() => onEdit(item)}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${item.title}`}
                      onClick={() => onDelete(item._id)}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 bg-white text-red-700"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="p-6 text-sm leading-6 text-slate-500">{empty}</p>
          )}
        </div>
      </div>
      <div>
        {editor || (
          <div className="card grid min-h-72 place-items-center p-10 text-center">
            <div>
              <h3 className="text-xl font-bold">
                Select an item or create a new one
              </h3>
              <p className="mt-2 text-slate-500">
                Changes are only visible publicly when the status is published.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectEditor({
  value,
  onCancel,
  onSaved,
}: {
  value: Partial<Project>;
  onCancel: () => void;
  onSaved: (project: Project) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(value.thumbnail || "");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSaving(true);
    setError("");
    const data = new FormData(form);
    const payload = {
      title: text(data, "title"),
      slug: text(data, "slug"),
      shortDescription: text(data, "shortDescription"),
      fullDescription: text(data, "fullDescription"),
      industry: text(data, "industry"),
      clientType: text(data, "clientType"),
      services: csv(data, "services"),
      technologies: csv(data, "technologies"),
      features: lines(data, "features"),
      challenge: text(data, "challenge"),
      solution: text(data, "solution"),
      results: text(data, "results"),
      thumbnail: text(data, "thumbnail"),
      gallery: lines(data, "gallery"),
      liveUrl: text(data, "liveUrl"),
      githubUrl: text(data, "githubUrl"),
      featured: data.get("featured") === "on",
      status: text(data, "status"),
      seoTitle: text(data, "seoTitle"),
      seoDescription: text(data, "seoDescription"),
    };
    try {
      const saved = value._id
        ? await api.updateContent<Project>("projects", value._id, payload)
        : await api.createContent<Project>("projects", payload);
      onSaved(saved);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Unable to save project.",
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <EditorShell
      title={value._id ? "Edit project" : "New project"}
      onCancel={onCancel}
    >
      <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
        <Field
          name="title"
          label="Project title"
          defaultValue={value.title}
          required
        />
        <Field
          name="slug"
          label="URL slug"
          defaultValue={value.slug}
          placeholder="generated-from-title-if-empty"
        />
        <Field
          name="shortDescription"
          label="Short description"
          defaultValue={value.shortDescription}
          required
          wide
          textarea
        />
        <Field
          name="fullDescription"
          label="Project overview"
          defaultValue={value.fullDescription}
          wide
          textarea
        />
        <Field name="industry" label="Industry" defaultValue={value.industry} />
        <Field
          name="clientType"
          label="Client type"
          defaultValue={value.clientType}
        />
        <Field
          name="services"
          label="Services, comma separated"
          defaultValue={value.services?.join(", ")}
        />
        <Field
          name="technologies"
          label="Technologies, comma separated"
          defaultValue={value.technologies?.join(", ")}
        />
        <Field
          name="challenge"
          label="Business problem"
          defaultValue={value.challenge}
          wide
          textarea
        />
        <Field
          name="solution"
          label="Solution"
          defaultValue={value.solution}
          wide
          textarea
        />
        <Field
          name="features"
          label="Features, one per line"
          defaultValue={value.features?.join("\n")}
          wide
          textarea
        />
        <Field
          name="results"
          label="Genuine results only"
          defaultValue={value.results}
          wide
          textarea
        />
        <ImageUploadField value={thumbnailUrl} onChange={setThumbnailUrl} />
        <Field
          name="gallery"
          label="Gallery URLs, one per line"
          defaultValue={value.gallery?.join("\n")}
          textarea
        />
        <Field
          name="liveUrl"
          label="Live project URL"
          defaultValue={value.liveUrl}
          type="url"
        />
        <Field
          name="githubUrl"
          label="GitHub URL"
          defaultValue={value.githubUrl}
          type="url"
        />
        <Field
          name="seoTitle"
          label="SEO title"
          defaultValue={value.seoTitle}
        />
        <Field
          name="seoDescription"
          label="SEO description"
          defaultValue={value.seoDescription}
          textarea
        />
        <StatusSelect
          defaultValue={value.status || "draft"}
          options={["draft", "published", "archived"]}
        />
        <label className="flex items-center gap-3 self-end pb-3 text-sm font-semibold">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={value.featured}
            className="h-5 w-5"
          />{" "}
          Feature this project
        </label>
        {error && (
          <p
            role="alert"
            className="sm:col-span-2 text-sm font-semibold text-red-700"
          >
            {error}
          </p>
        )}
        <FormActions saving={saving} onCancel={onCancel} />
      </form>
    </EditorShell>
  );
}

function BlogEditor({
  value,
  onCancel,
  onSaved,
}: {
  value: Partial<BlogPost>;
  onCancel: () => void;
  onSaved: (post: BlogPost) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const status = text(data, "status");
    const payload = {
      title: text(data, "title"),
      slug: text(data, "slug"),
      excerpt: text(data, "excerpt"),
      content: text(data, "content"),
      featuredImage: text(data, "featuredImage"),
      author: text(data, "author"),
      category: text(data, "category"),
      tags: csv(data, "tags"),
      status,
      seoTitle: text(data, "seoTitle"),
      seoDescription: text(data, "seoDescription"),
      canonicalUrl: text(data, "canonicalUrl"),
      publishedAt:
        status === "published"
          ? value.publishedAt || new Date().toISOString()
          : undefined,
    };
    try {
      const saved = value._id
        ? await api.updateContent<BlogPost>("blog", value._id, payload)
        : await api.createContent<BlogPost>("blog", payload);
      onSaved(saved);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Unable to save article.",
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <EditorShell
      title={value._id ? "Edit article" : "New article"}
      onCancel={onCancel}
    >
      <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
        <Field
          name="title"
          label="Article title"
          defaultValue={value.title}
          required
        />
        <Field
          name="slug"
          label="URL slug"
          defaultValue={value.slug}
          placeholder="generated-from-title-if-empty"
        />
        <Field
          name="excerpt"
          label="Excerpt"
          defaultValue={value.excerpt}
          required
          wide
          textarea
        />
        <Field
          name="content"
          label="Article content"
          defaultValue={value.content}
          required
          wide
          textarea
          tall
        />
        <Field
          name="featuredImage"
          label="Featured image URL"
          defaultValue={value.featuredImage}
        />
        <Field name="author" label="Author" defaultValue={value.author} />
        <Field name="category" label="Category" defaultValue={value.category} />
        <Field
          name="tags"
          label="Tags, comma separated"
          defaultValue={value.tags?.join(", ")}
        />
        <Field
          name="seoTitle"
          label="SEO title"
          defaultValue={value.seoTitle}
        />
        <Field
          name="seoDescription"
          label="SEO description"
          defaultValue={value.seoDescription}
          textarea
        />
        <Field
          name="canonicalUrl"
          label="Canonical URL, if different"
          defaultValue={
            (value as BlogPost & { canonicalUrl?: string }).canonicalUrl
          }
          type="url"
          wide
        />
        <StatusSelect
          defaultValue={value.status || "draft"}
          options={["draft", "published"]}
        />
        {error && (
          <p
            role="alert"
            className="sm:col-span-2 text-sm font-semibold text-red-700"
          >
            {error}
          </p>
        )}
        <FormActions saving={saving} onCancel={onCancel} />
      </form>
    </EditorShell>
  );
}

function EditorShell({
  title,
  onCancel,
  children,
}: {
  title: string;
  onCancel: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-7 flex items-center justify-between">
        <h3 className="text-2xl font-bold">{title}</h3>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close editor"
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200"
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  );
}

function ImageUploadField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState("");

  async function upload(file?: File) {
    if (!file) return;
    setUploading(true);
    setError("");
    setDetails("");
    try {
      const result = await api.uploadImage(file);
      onChange(result.url);
      setDetails(
        `${result.width}×${result.height} WebP · ${Math.max(1, Math.round(result.bytes / 1024))} KB`,
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Unable to upload image.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="sm:col-span-2">
      <span className="text-sm font-semibold">Project thumbnail</span>
      <div className="mt-2 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[180px_1fr]">
        <div className="aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-white">
          {value ? (
            <img
              src={value}
              alt="Project thumbnail preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full place-items-center text-center text-xs font-semibold text-slate-400">
              Thumbnail preview
            </div>
          )}
        </div>
        <div>
          <label
            className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white ${uploading ? "pointer-events-none opacity-60" : ""}`}
          >
            <ImagePlus size={17} />
            {uploading ? "Uploading and optimizing…" : "Choose image"}
            <input
              className="sr-only"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              disabled={uploading}
              onChange={(event) => upload(event.target.files?.[0])}
            />
          </label>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            JPG, PNG, WebP or AVIF, up to 5 MB. Images are resized and converted
            to WebP automatically.
          </p>
          <label className="mt-3 block">
            <span className="text-xs font-semibold text-slate-500">
              Or enter an image URL
            </span>
            <input
              name="thumbnail"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="/uploads/project-thumbnail.webp"
              className="mt-1 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm"
            />
          </label>
          {details && (
            <p className="mt-2 text-xs font-semibold text-green-700">
              Uploaded: {details}
            </p>
          )}
          {error && (
            <p role="alert" className="mt-2 text-xs font-semibold text-red-700">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
  required = false,
  wide = false,
  textarea = false,
  tall = false,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  wide?: boolean;
  textarea?: boolean;
  tall?: boolean;
  type?: string;
  placeholder?: string;
}) {
  const classes = `mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 ${tall ? "min-h-80" : textarea ? "min-h-28" : "h-12"}`;
  return (
    <label className={wide ? "sm:col-span-2" : ""}>
      <span className="text-sm font-semibold">{label}</span>
      {textarea ? (
        <textarea
          className={classes}
          name={name}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={classes}
          name={name}
          defaultValue={defaultValue}
          required={required}
          type={type}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}
function StatusSelect({
  defaultValue,
  options,
}: {
  defaultValue: string;
  options: string[];
}) {
  return (
    <label>
      <span className="text-sm font-semibold">Status</span>
      <select
        name="status"
        defaultValue={defaultValue}
        className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
function FormActions({
  saving,
  onCancel,
}: {
  saving: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
      <button className="button-primary" disabled={saving} type="submit">
        {saving ? "Saving…" : "Save content"}
      </button>
      <button className="button-secondary" type="button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}
function text(data: FormData, key: string) {
  return String(data.get(key) || "").trim();
}
function csv(data: FormData, key: string) {
  return text(data, key)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}
function lines(data: FormData, key: string) {
  return text(data, key)
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean);
}
