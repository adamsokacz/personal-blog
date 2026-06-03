---
title: "NVIDIA Omniverse — Developer Notes"
excerpt: "A practical guide to the NVIDIA simulation ecosystem, the Omniverse extension model, and the most common scripting, UI, and development patterns."
publishDate: "2026-06-03"
tags:
  - omniverse
  - nvidia
  - simulation
  - python
featured: true
---

## The NVIDIA Ecosystem

| Platform | Role |
|---|---|
| **Omniverse** | The virtual simulation platform. GPU-native for incredible performance, and **open** — organizations can build their own extensions to extend its functionality. |
| **Isaac Sim** | A custom Omniverse Kit application that bundles common Omniverse extensions for **robotics simulation**. |
| **Metropolis** | A video-analysis platform that uses AI to understand what is happening through camera and sensor feeds — either inside an Omniverse simulation or in real life. |
| **Cosmos** | An AI platform that lets AI engineers build custom platforms. A key use case is generating **synthetic, photo-realistic visual scenarios** for Metropolis to test against. |
| **NIM** | NVIDIA's **containerized AI model** platform. |

---

## What is Omniverse

Omniverse is a simulation platform — essentially a specialized video-game engine — designed to:

- Work with NVIDIA's ecosystem of platforms
- Be **extensible**, so companies can easily build on top of it

It is built on **OpenUSD**, a unified standard for working with 3D items and animations virtually.

All tools within Omniverse are known as **Extensions**. Users can modify, share, or build their own at no cost. They're most commonly developed in **Python**, with resource-intensive processes implemented through the lower-level **C++** extension API.

Extensions interact with items in the Omniverse scene using **Scripting APIs**, which provide a set of commands for performing actions in the scene, according to OpenUSD specifications.

---

## Scripting APIs

### Example 1 — Iterate over all prims and select every Camera

```python
import omni.usd
from pxr import Usd, UsdGeom

# Get the current stage prims
ctx = omni.usd.get_context()
stage = ctx.get_stage()

# Iterate
camera_paths = []
for prim in stage.Traverse():
    if prim.IsA(UsdGeom.Camera):
        camera_paths.append(prim.GetPath().pathString)

for p in camera_paths:
    print(p)

# Select prims
selection = ctx.get_selection()
selection.set_selected_prim_paths(camera_paths, True)
```

### Example 2 — Get all vertices of a mesh prim

```python
import omni.usd
from pxr import UsdGeom

stage = omni.usd.get_context().get_stage()

# Get prim
prim = stage.GetPrimAtPath("/World/mesh_prim")
mesh = UsdGeom.Mesh(prim)

# Print vertices
points = mesh.GetPointsAttr().Get()
for i, p in enumerate(points):
    print(f"({p[0]}, {p[1]}, {p[2]})")
```

---

## Omniverse Extension Structure

### Folder Structure

```text
company.extension_name/              extension root, named by the full extension id
├── config/
│   └── extension.toml               manifest: metadata, dependencies, module entry point
├── data/                            icons and thumbnails shown in the Extensions UI (optional)
│   └── icon.png
├── docs/                            README / CHANGELOG (optional)
│   └── README.md
└── company/                         Python package mirroring the extension id namespace
    └── extension_name/
        ├── __init__.py              exposes the public API
        └── extension.py             entry point: defines the omni.ext.IExt subclass
```

- The extension **root folder** is named with the full extension ID.
- **`config/extension.toml`** is the manifest. It specifies:
  - Extension metadata (title, version, description)
  - Dependencies on other extensions & their versions
  - The Python module entry point (`[[python.module]]`)
- The **Python package** mirrors the id as nested folders (`company/tool/`).
  - It should contain an `__init__.py` that provides the entry point.
- The **entry point** is `extension.py`, which implements the extension from the `omni.ext.IExt` base class.

### Minimal `extension.py`

```python
import omni.ext

class MyExtension(omni.ext.IExt):
    def on_startup(self, ext_id):
        print(f"[company.extension_name] startup")

    def on_shutdown(self):
        print(f"[company.extension_name] shutdown")
```

### Common `extension.py`

```python
import omni.ext
import omni.kit.app
import omni.ui as ui

class CompanyToolExtension(omni.ext.IExt):
    def on_startup(self, ext_id):
        self._ext_id = ext_id

        ext_name = omni.ext.get_extension_name(ext_id)

        ext_manager = omni.kit.app.get_app().get_extension_manager()
        ext_path = ext_manager.get_extension_path(ext_id)

        print(f"id:   {ext_id}")
        print(f"name: {ext_name}")
        print(f"path: {ext_path}")

        self._window = ui.Window(ext_name, width=400, height=300)

    def on_shutdown(self):
        if self._window is not None:
            self._window.destroy()
            self._window = None
        print(f"[{self._ext_id}] shutdown")
```

---

## Extension Design Patterns

**Shared variables**

- Sometimes it's useful to make variables accessible to all `ui.Window`s and `ui.Frame`s within the extension.
- For simple extensions, implement these in a class — as simple or abstract data models — and provide them to the subclasses that need them.

**Connector pattern**

- One of the primary roles of Omniverse Extensions is to connect Omniverse to **external software applications**.
- Creating robust interfaces that map to these external applications is critical.

**Facade pattern**

- Your extension may expose APIs intended to be accessed by other Omniverse extensions.
- It becomes critical to abstract out back-end logic and provide these APIs as a **simple, robust interface, with unit tests**.

---

## User Interface

User interfaces are built with the **`omni.ui`** framework. Widgets live inside a window's frame and are positioned with layout containers. The examples below show the most common building blocks.

### Window

The top-level container. Add widgets inside its frame and arrange them with `VStack` (vertical) or `HStack` (horizontal) layouts.

```python
import omni.ui as ui

window = ui.Window("My Extension", width=320, height=240)
with window.frame:
    with ui.VStack(spacing=8, height=0):
        ui.Spacer(height=ui.Fraction(0.5))
        with ui.HStack(spacing=8, height=25):
            ui.Spacer(width=ui.Pixel(20))
            ui.Label("Example Label")
            ui.Spacer(width=ui.Percentage(20))
```

### Label

Displays static text, with an optional `style` dict to override visual elements such as font size and color.

```python
import omni.ui as ui

ui.Label("Status: ready", height=20)
ui.Label("Section title", style={"font_size": 18, "color": 0xFFDDDDDD})
```

### Button

For a clickable button, pass a callback to `clicked_fn` to run code on press.

```python
import omni.ui as ui

def _on_click():
    print("Button pressed")

ui.Button("Run", height=30, clicked_fn=_on_click)
```

### Combo box

A dropdown selector. Pass the default index followed by the option strings, then read or watch the selected index through its model.

```python
import omni.ui as ui

combo = ui.ComboBox(0, "Low", "Medium", "High")

selected = combo.model.get_item_value_model().get_value_as_int()

combo.model.add_item_changed_fn(
    lambda m, i: print("selected:", m.get_item_value_model().get_value_as_int())
)
```

---

## Development

The snippets below cover common APIs.

### Context & stage

The `UsdContext` is the entry point to the running session. From it you get the active stage, the current selection, and stage-level event streams.

```python
import omni.usd

ctx = omni.usd.get_context()
stage = ctx.get_stage()
selection = ctx.get_selection()
```

### Traversing the stage tree

`Stage.Traverse()` yields every prim depth-first. Use `prim.IsA(...)` to filter by type, or walk a single branch with `GetChildren()`.

```python
import omni.usd
from pxr import UsdGeom

stage = omni.usd.get_context().get_stage()

for prim in stage.Traverse():
    print(prim.GetPath(), prim.GetTypeName())

meshes = [p for p in stage.Traverse() if p.IsA(UsdGeom.Mesh)]

parent = stage.GetPrimAtPath("/World")
for child in parent.GetChildren():
    print(child.GetName())
```

### Reading & writing prim attributes

Attributes hold a prim's data — visibility, transforms, shader inputs, or your own custom values. Use `GetAttribute()`/`Get()` to read and `Set()` to author; `CreateAttribute()` adds new ones.

```python
import omni.usd
from pxr import Sdf, UsdGeom, Gf

stage = omni.usd.get_context().get_stage()
prim = stage.GetPrimAtPath("/World/Cube")

# Read an existing attribute
vis = prim.GetAttribute("visibility").Get()

# Author / change an attribute value
prim.GetAttribute("visibility").Set("invisible")

# Create a new custom attribute and set it
prim.CreateAttribute("my:score", Sdf.ValueTypeNames.Float).Set(0.5)

# Move a prim by adding a translate op
xform = UsdGeom.Xformable(prim)
xform.AddTranslateOp().Set(Gf.Vec3d(0.0, 100.0, 0.0))
```

### Listening for stage changes

Register a USD notice to react to data changes instead of polling. `ObjectsChanged` fires whenever prims or attributes are added, removed, or edited. Keep the listener handle and `Revoke()` it on shutdown.

```python
import omni.usd
from pxr import Usd, Tf

def _on_objects_changed(notice, stage):
    for path in notice.GetChangedInfoOnlyPaths():
        print("changed:", path)

stage = omni.usd.get_context().get_stage()

self._listener = Tf.Notice.Register(
    Usd.Notice.ObjectsChanged, _on_objects_changed, stage
)

# In on_shutdown:  self._listener.Revoke()
```

### Subscribing to stage & update events

Kit exposes event streams for higher-level events: the **stage event stream** (open, close, selection changes) and the **app update stream** for per-frame logic. Each `create_subscription_to_pop()` returns a handle you must keep alive.

```python
import omni.usd
import omni.kit.app

def _on_stage_event(e):
    if e.type == int(omni.usd.StageEventType.SELECTION_CHANGED):
        print("selection changed")

ctx = omni.usd.get_context()
self._stage_sub = ctx.get_stage_event_stream().create_subscription_to_pop(
    _on_stage_event, name="my.tool.stage_event"
)

def _on_update(e):
    dt = e.payload["dt"]

app = omni.kit.app.get_app()
self._update_sub = app.get_update_event_stream().create_subscription_to_pop(
    _on_update, name="my.tool.update"
)

# Keep both subscription handles alive; drop them in on_shutdown.
```

### Spawning a UI window

UI is built with `omni.ui`. A `Window` hosts a frame containing layout containers (`VStack`, `HStack`) and widgets (`Label`, `Button`, fields). Build the tree once on startup and destroy the window on shutdown.

```python
import omni.ui as ui

self._window = ui.Window("My Tool", width=320, height=200)
with self._window.frame:
    with ui.VStack(spacing=8):
        ui.Label("Hello from my extension")
        self._field = ui.StringField()
        ui.Button("Run", clicked_fn=lambda: print(self._field.model.get_value_as_string()))

# In on_shutdown:  self._window.destroy(); self._window = None
```

### Value models — `SimpleIntModel` & friends

`omni.ui` follows a **model-view pattern**: every widget reads and writes its data through a model rather than holding the value itself. The simple models each wrap one primitive — `SimpleIntModel`, `SimpleFloatModel`, `SimpleBoolModel`, and `SimpleStringModel`. Bind the same model to multiple widgets and they stay in sync automatically.

```python
import omni.ui as ui

int_model    = ui.SimpleIntModel(5)
float_model  = ui.SimpleFloatModel(1.0)
bool_model   = ui.SimpleBoolModel(True)
string_model = ui.SimpleStringModel("hello")

n = int_model.get_value_as_int()
s = string_model.get_value_as_string()

int_model.set_value(10)

int_model.add_value_changed_fn(lambda m: print(m.get_value_as_int()))

ui.IntSlider(model=int_model)
ui.IntField(model=int_model)
```

### Abstract models — custom value & item models

When the built-in models aren't enough, subclass the abstract base classes. `AbstractValueModel` backs a single-value widget with your own storage or computed logic — implement the `get_value_as_*` and `set_value` methods and call `_value_changed()` to refresh the view.

```python
import omni.ui as ui

class CelsiusModel(ui.AbstractValueModel):
    def __init__(self, value=0.0):
        super().__init__()
        self._value = float(value)

    def get_value_as_float(self):
        return self._value

    def get_value_as_string(self):
        return f"{self._value:.1f} C"

    def set_value(self, value):
        value = float(value)
        if value != self._value:
            self._value = value
            self._value_changed()

ui.FloatField(model=CelsiusModel(20.0))
```

`AbstractItemModel` backs collection widgets such as `ComboBox` and `TreeView`. You expose your data by implementing `get_item_children` (the rows), `get_item_value_model_count` (the columns), and `get_item_value_model` (the value per cell), and call `_item_changed()` whenever the data changes.

```python
import omni.ui as ui

class StringListModel(ui.AbstractItemModel):
    class Item(ui.AbstractItem):
        def __init__(self, text):
            super().__init__()
            self.model = ui.SimpleStringModel(text)

    def __init__(self, *options):
        super().__init__()
        self._items = [self.Item(t) for t in options]
        self._item_changed(None)

    def get_item_children(self, item=None):
        return self._items if item is None else []

    def get_item_value_model_count(self, item=None):
        return 1

    def get_item_value_model(self, item, column_id):
        return item.model

ui.ComboBox(0, model=StringListModel("Low", "Medium", "High"))
```
