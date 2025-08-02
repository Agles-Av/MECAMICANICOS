export const InventoryAdapter = {
  toDTO: (item) => ({
    nombre: item.nombre,
    descripcion: item.descripcion,
    categoria: item.categoria,
    codigo: item.codigo,
    stock: item.stock,
    stockMinimo: item.stockMinimo,
    precio: item.precio,
    ubicacion: item.ubicacion,
    proveedor: item.proveedor,
    status: item.status,
  }),

  toModel: (data) => ({
    id: data.id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    categoria: data.categoria, // Objeto categoría completo
    codigo: data.codigo,
    stock: data.stock,
    stockMinimo: data.stockMinimo,
    precio: data.precio,
    ubicacion: data.ubicacion,
    proveedor: data.proveedor, // Objeto proveedor si existe
    status: data.status,
    fechaCreacion: data.fechaCreacion,
    fechaActualizacion: data.fechaActualizacion,
  }),
}
