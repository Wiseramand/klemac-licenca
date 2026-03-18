const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const SEED = [
  {usuario:'Carlos Mendonça',email:'carlos@empresa.ao',departamento:'Tecnologia de Informação',software:'Antivirus',data_instalacao:'2024-01-15',data_expiracao:'2025-04-15',numero_licenca:'AV-2024-001',observacoes:''},
  {usuario:'Ana Silva',email:'ana@empresa.ao',departamento:'Recursos Humanos',software:'Microsoft Office',data_instalacao:'2024-03-01',data_expiracao:'2025-03-01',numero_licenca:'OFF-2024-002',observacoes:''},
  {usuario:'João Baptista',email:'joao@empresa.ao',departamento:'Financeiro',software:'Primavera',data_instalacao:'2024-02-10',data_expiracao:'2025-04-06',numero_licenca:'PRI-2024-003',observacoes:'Licença Enterprise'},
  {usuario:'Maria Luísa',email:'maria@empresa.ao',departamento:'Contabilidade',software:'SICA',data_instalacao:'2024-04-01',data_expiracao:'2025-04-10',numero_licenca:'SIC-2024-004',observacoes:''},
  {usuario:'Pedro Neto',email:'pedro@empresa.ao',departamento:'Marketing',software:'Zoom',data_instalacao:'2024-05-20',data_expiracao:'2025-05-20',numero_licenca:'ZOM-2024-005',observacoes:''},
  {usuario:'Sofia Costa',email:'sofia@empresa.ao',departamento:'Marketing',software:'Adobe Creative Cloud',data_instalacao:'2024-01-01',data_expiracao:'2025-03-20',numero_licenca:'ADO-2024-006',observacoes:''},
  {usuario:'Luís Ferreira',email:'luis@empresa.ao',departamento:'Tecnologia de Informação',software:'Microsoft Office',data_instalacao:'2024-06-01',data_expiracao:'2025-06-01',numero_licenca:'OFF-2024-007',observacoes:''},
  {usuario:'Teresa Gomes',email:'teresa@empresa.ao',departamento:'Administração',software:'Antivirus',data_instalacao:'2024-07-15',data_expiracao:'2025-07-15',numero_licenca:'AV-2024-008',observacoes:''},
  {usuario:'António Dias',email:'antonio@empresa.ao',departamento:'Direcção Geral',software:'Zoom',data_instalacao:'2024-08-01',data_expiracao:'2025-04-20',numero_licenca:'ZOM-2024-009',observacoes:''},
  {usuario:'Beatriz Lopes',email:'beatriz@empresa.ao',departamento:'Jurídico',software:'Microsoft Office',data_instalacao:'2024-09-01',data_expiracao:'2025-09-01',numero_licenca:'OFF-2024-010',observacoes:''},
]

async function main() {
  console.log('Seeding data...')
  for (const item of SEED) {
    await prisma.license.create({ data: item })
  }
  console.log('Done!')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
